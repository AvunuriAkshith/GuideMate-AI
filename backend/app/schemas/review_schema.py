from pydantic import BaseModel

class ReviewCreate(BaseModel):

    tourist_email: str
    guide_email: str
    rating: int
    comment: str