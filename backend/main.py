from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from routers import pii_detection, session, login

app = FastAPI(title="PII Detection API")

app.include_router(pii_detection.router, prefix="/pii")
app.include_router(session.router, prefix="/session")
app.include_router(login.router, prefix="/login")


@app.get("/")
def read_root():
    return {"message": "PII Detection API Is Running"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
