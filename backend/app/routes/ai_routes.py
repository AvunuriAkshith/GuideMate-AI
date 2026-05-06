import google.generativeai as genai
import os

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from app.database.db import db
load_dotenv()

router = APIRouter()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.0-flash-lite"
)

@router.post("/trip-plan")
async def generate_trip_plan(data: dict):

    try:

        destination = data.get("destination")
        days = data.get("days")
        budget = data.get("budget")
        interests = data.get("interests")

        prompt = f"""
        Create a detailed travel itinerary.

        Destination: {destination}
        Days: {days}
        Budget: ₹{budget}
        Interests: {interests}

        Include:
        - Day wise itinerary
        - Famous tourist places
        - Food recommendations
        - Estimated expenses
        - Travel tips
        """

        response = model.generate_content(
            prompt
        )

        return {
            "trip_plan": response.text
        }

    except Exception as e:

        print("AI ERROR:", str(e))

        if "429" in str(e):

            return {
            "trip_plan":
            "AI rate limit reached. Please wait 1 minute and try again."
        }

        return {
        "trip_plan":
        "AI service temporarily unavailable."
    }
@router.post("/travel-chat")
async def travel_chat(data: dict):

    try:

        user_message = data.get(
            "message"
        )

        prompt = f"""
        You are GuideMate AI,
        an intelligent travel assistant.

        User Message:
        {user_message}
        """

        response = model.generate_content(
            prompt
        )

        return {
            "reply":
                response.text
        }

    except Exception as e:

        print(
            "CHATBOT ERROR:",
            str(e)
        )

        msg = data.get(
            "message",
            ""
        ).lower()

        # FALLBACK RESPONSES
        if "paris" in msg:

            return {
                "reply":
                "🇫🇷 Paris is amazing for art, cafes, and culture. Recommended attractions include Eiffel Tower, Louvre Museum, and Seine River cruises."
            }

        elif "japan" in msg:

            return {
                "reply":
                "🇯🇵 Japan offers beautiful cultural experiences. Tokyo is perfect for technology and nightlife, while Kyoto is famous for temples and traditions."
            }

        elif "food" in msg:

            return {
                "reply":
                "🍜 Food tours are one of the best ways to explore local culture. Italy, Japan, Thailand, and France are top destinations for food lovers."
            }

        elif "adventure" in msg:

            return {
                "reply":
                "⛰️ Adventure travelers love destinations like Peru, Nepal, Switzerland, and New Zealand for hiking, trekking, and outdoor experiences."
            }

        return {
            "reply":
            "✨ GuideMate AI is temporarily running in offline mode. Try asking about Paris, Japan, food tours, or adventure travel."
        }
@router.post("/save-trip")
async def save_trip(data: dict):

    try:

        saved_trip = {

            "user_email":
                data.get("user_email"),

            "destination":
                data.get("destination"),

            "trip_plan":
                data.get("trip_plan")
        }

        result = await db["saved_trips"].insert_one(
            saved_trip
        )

        return {

            "message":
                "Trip saved successfully",

            "trip_id":
                str(result.inserted_id)
        }

    except Exception as e:

        print("SAVE ERROR:", str(e))

        return {
            "message":
                "Failed to save trip"
        }
@router.get("/saved-trips/{email}")
async def get_saved_trips(email: str):

    trips = await db["saved_trips"].find(
        {
            "user_email": email
        }
    ).to_list(length=100)

    for trip in trips:
        trip["_id"] = str(trip["_id"])

    return trips