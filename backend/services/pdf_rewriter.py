import fitz

def replace_pii_and_generate_pdf(input_pdf_path, pii_list, output_path):
    """
    Replaces PII in the PDF and generates a new PDF.
    
    :param input_pdf_path: Path to the input PDF file.
    :param pii_list: List of dictionaries containing PII information to replace.
    :param output_path: Path to save the rewritten PDF.
    """
    doc = fitz.open(input_pdf_path)
    for page in doc:
        for pii in pii_list:
            if pii["page_number"] != page.number + 1:
                continue
            value = pii["value"]
            for inst in page.search_for(value): # Finds the bounding box location on the page where the value appears
                page.add_redact_annot(inst, fill=(0, 0, 0))
        page.apply_redactions()
    doc.save(output_path)


