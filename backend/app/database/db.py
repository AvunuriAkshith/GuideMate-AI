from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

print("MONGO_URL:", MONGO_URL)
print("DATABASE_NAME:", DATABASE_NAME)

client = AsyncIOMotorClient(MONGO_URL)

db = client[DATABASE_NAME]