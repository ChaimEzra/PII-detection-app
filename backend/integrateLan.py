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

def process_pdfs_with_line_info(folder_path, classifier_hebrew, analyzer_english):
    #Process all PDFs in a folder and detect PII
    pdf_files = [f for f in os.listdir(folder_path) if f.endswith(".pdf")]
    all_results = []

    for pdf_file in pdf_files:
        print(f"\nProcessing file: {pdf_file}")
        pdf_path = os.path.join(folder_path, pdf_file)
        lines_with_pages = extract_text_with_lines_and_pages(pdf_path)

        for line_info in lines_with_pages:
            line_text = line_info["text"]
            line_number = line_info["line_number"]
            page_number = line_info["page_number"]
            line_results = detect_pii_in_line(
                line_text, line_number, page_number, pdf_file, classifier_hebrew, analyzer_english
            )
            all_results.extend(line_results)

    return all_results

# ------------------ Main Function ------------------

def main():
    # Initialize models
    classifier_hebrew = initialize_hebrew_model()
    analyzer_english = initialize_presidio_with_custom_recognizers()

    # Specify the folder containing PDFs
    pdf_folder = "./" 

    # Process PDFs and save results
    results = process_pdfs_with_line_info(pdf_folder, classifier_hebrew, analyzer_english)

    # Save results to JSON
    output_file = "pii_detection_results_with_pages.json"
    with open(output_file, "w") as f:
        json.dump(results, f, indent=4, ensure_ascii=False)
    print(f"\nPII detection results saved to {output_file}")

# ------------------ Run the Script ------------------

if __name__ == "__main__":
    main()
