
import certifi
from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://chimas1357:chaim2525@cluster0.xv05qvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    tlsCAFile=certifi.where()
)

db = client["PII-loginDB"]
users_collection = db["PII-loginDB"]
