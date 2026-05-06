from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import db
import socketio

from app.routes.auth_routes import (
    router as auth_router
)

from app.routes.ai_routes import (
    router as ai_router
)

# Socket.IO server
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*"
)

# FastAPI app
fastapi_app = FastAPI()

# CORS
fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
fastapi_app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

fastapi_app.include_router(
    ai_router,
    prefix="/api/ai",
    tags=["AI"]
)

# Home Route
@fastapi_app.get("/")
def home():

    return {
        "message": "GuideMate AI Running"
    }

# Socket Events

@sio.event
async def connect(sid, environ):

    print("Connected:", sid)

@sio.event
async def disconnect(sid):

    print("Disconnected:", sid)

@sio.event
async def join_room(sid, data):

    room = data["room"]

    await sio.enter_room(
        sid,
        room
    )

    print(f"{sid} joined {room}")

@sio.event
async def send_message(sid, data):

    room = data["room"]

    print("Private Message:", data)

    # Save message
    await db["messages"].insert_one({

        "room": room,
        "sender": data["sender"],
        "text": data["text"]
    })

    # Emit message
    await sio.emit(
        "receive_message",
        data,
        room=room
    )
# FINAL ASGI APP
app = socketio.ASGIApp(
    sio,
    other_asgi_app=fastapi_app
)
@fastapi_app.get("/api/messages/{room}")
async def get_messages(room: str):

    messages = await db["messages"].find(
        {
            "room": room
        }
    ).to_list(length=100)

    for msg in messages:
        msg["_id"] = str(msg["_id"])

    return messages