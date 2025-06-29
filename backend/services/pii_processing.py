import os
import pdfplumber
from presidio_analyzer import Pattern, PatternRecognizer, AnalyzerEngine
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers.pipelines import pipeline
from langdetect import detect
import spacy
import json
import re

# ------------------ Initialization Functions ------------------

def initialize_hebrew_model():
    #Initialize the Hebrew Hugging Face model
    model_name = "CordwainerSmith/GolemPII-v1"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForTokenClassification.from_pretrained(model_name)
    classifier = pipeline(
        "token-classification",
        model=model,
        tokenizer=tokenizer,
        aggregation_strategy="simple"
    )
    print("Hebrew model initialized.")
    return classifier

def initialize_presidio_with_custom_recognizers():
    #Initialize Presidio Analyzer with custom recognizers.
    analyzer = AnalyzerEngine()

    # Add custom recognizers
    # ADDRESS
    address_pattern = Pattern(
        "AddressPattern",
        r"\d{1,5}\s[\w\s]+\s(?:Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Lane|Ln)\.?,?\s[\w\s]+",
        0.85
    )
    analyzer.registry.add_recognizer(PatternRecognizer("ADDRESS", patterns=[address_pattern]))

# Hebrew street names transliterated to English letters
    address_pattern_he_en = Pattern(
        "HebrewAddressEnglish",
        r"(Rechov|Derech|Kikar|Semta|Shderot|Pina)\s[\w\s'\-]+",
        0.85
    )
    analyzer.registry.add_recognizer(PatternRecognizer("ADDRESS_HEBREW_EN", patterns=[address_pattern_he_en]))

    # Phone pattern (English & Israeli style)
    phone_pattern = Pattern(
        "PhonePattern",
        r"(\+972-?|0)([23489]{1}\-?\d{7}|[567]{1}\-?\d{7})",
        0.9
    )
    analyzer.registry.add_recognizer(PatternRecognizer("PHONE_NUMBER", patterns=[phone_pattern]))
    # Teudat Zehut pattern (Israeli ID number)
    teudat_zehut_pattern = Pattern(
        "TeudatZehutPattern",
        r"\b0*\d{8,9}\b",  # Matches 8 or 9 digits, with optional leading zeros
        0.9  # Confidence score, adjust as needed
    )
    teudat_zehut_recognizer = PatternRecognizer(
        supported_entity="TEUDAT_ZEHUT",
        patterns=[teudat_zehut_pattern]
    )
    analyzer.registry.add_recognizer(teudat_zehut_recognizer)

    print("Custom recognizers added to Presidio analyzer.")
    return analyzer

def initialize_spacy():
    # Load the English spaCy model
    try:
        nlp = spacy.load("en_core_web_lg") 
        print("spaCy model loaded.")
        return nlp
    except OSError:
        print("spaCy model not found. Run: python -m spacy download en_core_web_sm")
        raise


# ------------------ Core Functions ------------------

def detect_pii_in_line(text, line_number, page_number, file_name, classifier_hebrew, analyzer_english):
    #Detect PII in a single line of text
    if not text.strip() or len(text.strip()) < 3:
        print(f"Skipping line {line_number} on page {page_number}.")
        return []

    # Preprocess text to clean up
    text = re.sub(r'\b(\w)\s+', r'\1', text)

    # Detect language
    try:
        language = detect(text) if len(text.split()) >= 3 else "en"
    except Exception:
        print(f"Error detecting language for line {line_number}. Defaulting to English.")
        language = "en"

    results = []
    if language == "he":
        print(f"Running Hebrew model for line {line_number} on page {page_number}.")
        model_results = classifier_hebrew(text)
        for res in model_results:
            results.append({
                "file_name": file_name,
                "page_number": page_number,
                "line_number": line_number,
                "entity": res["entity_group"],
                "value": res["word"],
                "confidence": res["score"],
                "line_text": text
            })
    elif language == "en":
        print(f"Running English model for line {line_number} on page {page_number}.")
        model_results = analyzer_english.analyze(text=text, language="en")
        for result in model_results:
            entity_text = text[result.start:result.end]
            results.append({
                "file_name": file_name,
                "page_number": page_number,
                "line_number": line_number,
                "entity": result.entity_type,
                "value": entity_text,
                "confidence": result.score,
                "line_text": text
            })

    return results

def extract_text_with_lines_and_pages(pdf_path):
    #Extract text from a PDF with line and page numbers.
    with pdfplumber.open(pdf_path) as pdf:
        all_lines = []
        for page_number, page in enumerate(pdf.pages, start=1):
            page_lines = page.extract_text().split("\n") if page.extract_text() else []
            for line_number, line_text in enumerate(page_lines, start=1):
                all_lines.append({
                    "page_number": page_number,
                    "line_number": line_number,
                    "text": line_text
                })
        return all_lines
def find_matching_line(sentence_text, lines):
    sentence = sentence_text.strip()
    for line in lines:
        line_text = line["text"].strip()
        if sentence == line_text:
            return line
    for line in lines:
        line_text = line["text"].strip()
        if len(line_text) > 5 and line_text in sentence:
            return line
    print(f"[DEBUG] No match found for sentence: '{sentence_text}'")
    return None


def process_pdf(file_path, classifier_hebrew, analyzer_english, spacy_nlp):
    lines_with_pages = extract_text_with_lines_and_pages(file_path)
    results = []

    # Group lines by page for sentence segmentation
    pages = {}
    for line in lines_with_pages:
        pages.setdefault(line["page_number"], []).append(line)

    for page_number, lines in pages.items():
        # Combine all lines into full page text
        page_text = "\n".join([line["text"] for line in lines])
        doc = spacy_nlp(page_text)

        # Process each sentence from spaCy
        for sent in doc.sents:
            sentence_text = sent.text.strip()
            if not sentence_text or len(sentence_text) < 3:
                continue

            # Try to map sentence to its original line (for context)
            matched_line = find_matching_line(sentence_text, lines)
            line_number = matched_line["line_number"] if matched_line else -1
            line_text = matched_line["text"] if matched_line else sentence_text

            # Detect PII (reusing your detect_pii_in_line logic)
            pii_results = detect_pii_in_line(
                sentence_text,
                line_number,
                page_number,
                os.path.basename(file_path),
                classifier_hebrew,
                analyzer_english
            )
            filtered_entities = []
            for entity in pii_results:
                if entity["confidence"] >= 0.85 and entity["entity"] not in ["DATE", "DATE_TIME", "DATE_RANGE"]:
                    filtered_entities.append(entity)
            results.extend(filtered_entities)

    return results

