import os
import pdfplumber
from presidio_analyzer import Pattern, PatternRecognizer, AnalyzerEngine
from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline
from langdetect import detect
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
    address_pattern = Pattern(
        "AddressPattern",
        r"\d+\s[A-Za-z]+\s(?:St\.|Ave\.|Blvd\.|Rd\.),\s[A-Za-z\s]+",
        0.85
    )
    address_recognizer = PatternRecognizer(
        supported_entity="ADDRESS",
        patterns=[address_pattern]
    )
    analyzer.registry.add_recognizer(address_recognizer)

    date_pattern = Pattern(
        "DateRangePattern",
        r"\b\d{4}\s?[-–]\s?\d{4}\b",
        0.85
    )
    date_recognizer = PatternRecognizer(
        supported_entity="DATE_RANGE",
        patterns=[date_pattern]
    )
    analyzer.registry.add_recognizer(date_recognizer)

    print("Custom recognizers added to Presidio analyzer.")
    return analyzer

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

def process_pdf(file_path, classifier_hebrew, analyzer_english):
    lines_with_pages = extract_text_with_lines_and_pages(file_path)
    results = []

    for line_info in lines_with_pages:
        line_results = detect_pii_in_line(
            line_info["text"],
            line_info["line_number"],
            line_info["page_number"],
            os.path.basename(file_path),
            classifier_hebrew,
            analyzer_english
        )
        results.extend(line_results)

    return results
