from fastapi import APIRouter, UploadFile, File, HTTPException
# from services.pii_processing import initialize_hebrew_model, initialize_presidio_with_custom_recognizers, process_pdf
from services.pii_processing import initialize_hebrew_model, initialize_presidio_with_custom_recognizers, process_pdf, initialize_spacy
import shutil
import os

router = APIRouter()

# relative path.
UPLOAD_DIR = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), "..", "uploads")
# initializing the models when the app starts
classifier_hebrew = initialize_hebrew_model()
analyzer_english = initialize_presidio_with_custom_recognizers()
spacy_nlp = initialize_spacy()


@router.get("/")
async def root():
    return {"message": "PII Detection API Is Running hi from pii_detection.py"}


@router.post("/upload")
async def upload_pdfs(files: list[UploadFile] | UploadFile = File(...)):
    results = []

    # if there is 1 file, then we convert it into a list so that the function treats everything uniformly
    if not isinstance(files, list):
        files = [files]

    # for every file, we put it to the uploads folder and extract the pii
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            pii_result = process_pdf(
                file_path, classifier_hebrew, analyzer_english, spacy_nlp)
            results.append({file.filename: pii_result})
        except FileNotFoundError:
            raise HTTPException(
                status_code=500, detail=f"Error saving file: {file.filename}. File not found.")
        except PermissionError:
            raise HTTPException(
                status_code=500, detail=f"Error saving file: {file.filename}. Permission denied.")
        except shutil.Error as e:
            raise HTTPException(
                status_code=500, detail=f"Error saving file: {file.filename}. {str(e)}")
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"An unexpected error occurred processing {file.filename}: {str(e)}")

    return {"pii_detected ": results}
