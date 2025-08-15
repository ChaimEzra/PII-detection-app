import os
import shutil
from fastapi import APIRouter
from Mongo_connection import users_collection
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from routers import pii_detection, session, login
from fastapi.middleware.cors import CORSMiddleware
import bcrypt

router = APIRouter()


# router.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # תוכל להצר אם אתה רוצה רק את react שלך
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


class User(BaseModel):
    createdAt: str
    username: str
    email: str
    password: str


@router.post("/signup")
def signup(user: User):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_password = hash_password(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    users_collection.insert_one(user_dict)
    return {"message": "User registered successfully"}


@router.post("/login")
def login(user: User):
    # user_by_username = users_collection.find_one({"username": user.username})
    user_by_email = users_collection.find_one({"email": user.email})
    if user_by_email and verify_password(user.password, user_by_email["password"]):
        user_id = str(user_by_email["_id"])
        return {"message": "Login successful", "user_id": user_id}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


UPLOAD_DIR = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), "..", "uploads")


@router.post("/logout")
def logout(user_id: str):
    user_folder = os.path.join(UPLOAD_DIR, user_id)
    if os.path.exists(user_folder):
        try:
            shutil.rmtree(user_folder)  # מוחק את כל התיקייה של המשתמש
            return {"message": f"User {user_id} logged out and folder deleted.", "user_id": user_id}
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error deleting folder: {str(e)}")
    return {"message": "User folder not found, but logged out successfully.", "user_id": user_id}


@router.get("/logout")
async def logout():
    return {"message": "Logout successful"}
