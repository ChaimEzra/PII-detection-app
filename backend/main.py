from Mongo_connection import users_collection
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from routers import pii_detection, session, login
from fastapi.middleware.cors import CORSMiddleware
import bcrypt


app = FastAPI(title="PII Detection API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # תוכל להצר אם אתה רוצה רק את react שלך
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(pii_detection.router, prefix="/pii")
app.include_router(session.router, prefix="/session")
app.include_router(login.router, prefix="/login-page")


# def hash_password(password: str) -> str:
#     salt = bcrypt.gensalt()
#     hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
#     return hashed.decode('utf-8')


# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


@app.get("/")
def read_root():
    return {"message": "PII Detection API Is Running"}


@app.get("/login-page")
def read_root():
    return {"message": "PII Detection API Is Running on login page "}

# app = FastAPI()


# class User(BaseModel):
#     username: str
#     email: str
#     password: str


# @app.post("/signup")
# def signup(user: User):
#     if users_collection.find_one({"username": user.username}):
#         raise HTTPException(status_code=400, detail="Username already exists")
#     hashed_password = hash_password(user.password)
#     user_dict = user.dict()
#     user_dict["password"] = hashed_password
#     users_collection.insert_one(user_dict)
#     return {"message": "User registered successfully"}


# @app.post("/login")
# def login(user: User):
#     user_by_email = users_collection.find_one({"email": user.email})
#     if user_by_email and verify_password(user.password, user_by_email["password"]):
#         # התחברות הצליחה
#         return {"message": "Login successful"}
#     else:
#         # שגיאה
#         raise HTTPException(status_code=401, detail="Invalid credentials")

    # db_user = users_collection.find_one({"username": user.username})
    # if not db_user or db_user["password"] != user.password:
    #     raise HTTPException(status_code=401, detail="Invalid credentials")
    # return {"message": "Login successful"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
