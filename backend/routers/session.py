## Manages file deletion after a user session
import os
import shutil
from fastapi import APIRouter

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "uploads") #relative path.

router = APIRouter()

@router.delete("/clear")
async def clear_session():
    if os.path.exists(UPLOAD_DIR):
        shutil.rmtree(UPLOAD_DIR)
        os.makedirs(UPLOAD_DIR)
    return{"messsage": "All upload files have been deleted"}