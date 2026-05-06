from pydantic import BaseModel

class BookingCreate(BaseModel):

    tourist_email: str
    guide_email: str
    date: str