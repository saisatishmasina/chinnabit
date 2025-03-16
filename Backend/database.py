from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Use MySQL from environment variable
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

print(f"Using database URL: {SQLALCHEMY_DATABASE_URL}")

# Create Engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    echo=True
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base model for SQLAlchemy
Base = declarative_base()

# Dependency function for getting the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()