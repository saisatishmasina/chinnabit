from sqlalchemy.orm import Session
from models import URLShortener
import random
import string

# Function to generate a random short URL
def generate_short_url():
    characters = string.ascii_letters + string.digits  # 62 characters: a-z, A-Z, 0-9
    return ''.join(random.choices(characters, k=10))  # Generate a 10-character short URL

# Function to create and store a shortened URL
def create_short_url(db: Session, original_url: str):
    # Check if URL already exists
    existing_url = db.query(URLShortener).filter(URLShortener.original_url == original_url).first()
    if existing_url:
        return existing_url  # Return the existing short URL

    # Generate a unique short URL
    short_url = generate_short_url()
    while db.query(URLShortener).filter(URLShortener.short_url == short_url).first():
        short_url = generate_short_url()  # Ensure uniqueness

    # Store in database
    new_url = URLShortener(original_url=original_url, short_url=short_url)
    db.add(new_url)
    db.commit()
    db.refresh(new_url)

    return new_url

# Function to retrieve URL by short URL
def get_original_url(db: Session, short_url: str):
    return db.query(URLShortener).filter(URLShortener.short_url == short_url).first()