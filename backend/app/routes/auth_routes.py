from fastapi import APIRouter, HTTPException
from app.schemas.user_schema import (
    UserRegister,
    UserLogin
)
from app.database.db import db
from app.auth.hash_password import (
    hash_password,
    verify_password
)
from app.auth.jwt_handler import create_access_token
from app.schemas.guide_schema import GuideProfile
from app.schemas.booking_schema import BookingCreate
from app.schemas.review_schema import ReviewCreate
from fastapi import UploadFile, File

import cloudinary.uploader

from app.utils.cloudinary_config import *
router = APIRouter()

users_collection = db["users"]

@router.post("/register")
async def register(user: UserRegister):

    existing_user = await users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_pw = hash_password(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_pw,
        "role": user.role
    }

    result = await users_collection.insert_one(new_user)

    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id)
    }

@router.post("/login")
async def login(user: UserLogin):

    existing_user = await users_collection.find_one(
        {"email": user.email}
    )

    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        existing_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token({
        "id": str(existing_user["_id"]),
        "role": existing_user["role"]
    })

    return {
        "access_token": token,
        "role": existing_user["role"]
    }
@router.get("/guides")
async def get_guides():

    guides = await users_collection.find(
        {"role": "guide"},
        {"password": 0}
    ).to_list(length=100)

    for guide in guides:
        guide["_id"] = str(guide["_id"])

    return guides
@router.put("/guide/profile/{email}")
async def update_guide_profile(
    email: str,
    profile: GuideProfile
):

    existing_guide = await users_collection.find_one(
        {
            "email": email,
            "role": "guide"
        }
    )

    if not existing_guide:
        raise HTTPException(
            status_code=404,
            detail="Guide not found"
        )

    await users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "bio": profile.bio,
                "location": profile.location,
                "languages": profile.languages,
                "specialization": profile.specialization,
                "price_per_day": profile.price_per_day,
                "experience": profile.experience,
                "rating": 4.8
            }
        }
    )

    return {
        "message": "Guide profile updated"
    }
@router.post("/bookings")
async def create_booking(
    booking: BookingCreate
):

    new_booking = {
        "tourist_email": booking.tourist_email,
        "guide_email": booking.guide_email,
        "date": booking.date,
        "status": "pending"
    }

    result = await db["bookings"].insert_one(
        new_booking
    )

    return {
        "message": "Booking request sent",
        "booking_id": str(result.inserted_id)
    }
@router.get("/bookings/{guide_email}")
async def get_guide_bookings(
    guide_email: str
):

    bookings = await db["bookings"].find(
        {
            "guide_email": guide_email
        }
    ).to_list(length=100)

    for booking in bookings:
        booking["_id"] = str(booking["_id"])

    return bookings
@router.put("/bookings/{booking_id}")
async def update_booking_status(
    booking_id: str,
    status: str
):

    from bson import ObjectId

    await db["bookings"].update_one(
        {
            "_id": ObjectId(booking_id)
        },
        {
            "$set": {
                "status": status
            }
        }
    )

    return {
        "message": f"Booking {status}"
    }
@router.post("/reviews")
async def add_review(
    review: ReviewCreate
):

    new_review = {

        "tourist_email":
            review.tourist_email,

        "guide_email":
            review.guide_email,

        "rating":
            review.rating,

        "comment":
            review.comment
    }

    result = await db["reviews"].insert_one(
        new_review
    )

    # Calculate average rating
    reviews = await db["reviews"].find(
        {
            "guide_email":
                review.guide_email
        }
    ).to_list(length=100)

    avg_rating = sum(
        r["rating"] for r in reviews
    ) / len(reviews)

    await users_collection.update_one(
        {
            "email":
                review.guide_email
        },
        {
            "$set": {
                "rating":
                    round(avg_rating, 1)
            }
        }
    )

    return {
        "message": "Review added",
        "review_id":
            str(result.inserted_id)
    }
@router.get("/reviews/{guide_email}")
async def get_reviews(
    guide_email: str
):

    reviews = await db["reviews"].find(
        {
            "guide_email":
                guide_email
        }
    ).to_list(length=100)

    for review in reviews:
        review["_id"] = str(review["_id"])

    return reviews
@router.post("/guide/upload-photo/{email}")
async def upload_guide_photo(
    email: str,
    file: UploadFile = File(...)
):

    # Upload to Cloudinary
    result = cloudinary.uploader.upload(
        file.file
    )

    image_url = result["secure_url"]

    # Save URL in MongoDB
    await users_collection.update_one(
        {
            "email": email
        },
        {
            "$set": {
                "profile_photo":
                    image_url
            }
        }
    )

    return {

        "message":
            "Photo uploaded",

        "image_url":
            image_url
    }