from pydantic import BaseModel
from typing import List

class GuideProfile(BaseModel):

    bio: str
    location: str
    languages: List[str]
    specialization: List[str]
    price_per_day: int
    experience: int