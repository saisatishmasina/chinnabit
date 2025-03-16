from pydantic import BaseModel
from typing import Optional

# Request schema for shortening a URL
class URLCreate(BaseModel):
    original_url: str

# Response schema
class URLResponse(BaseModel):
    short_url: str
    original_url: str

    class Config:
        orm_mode = True  # For pydantic v1 compatibility
        from_attributes = True  # Enables ORM support for pydantic v2