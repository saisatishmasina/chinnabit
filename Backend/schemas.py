from pydantic import BaseModel
from typing import Optional

# Request schema for shortening a URL
class URLCreate(BaseModel):
    original_url: str

# Response schema
class URLResponse(BaseModel):
    id: int
    short_url: str
    original_url: str

    class Config:
        from_attributes = True  # Enables ORM support