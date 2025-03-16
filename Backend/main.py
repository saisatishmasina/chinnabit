from fastapi import FastAPI, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import URLShortener
from schemas import URLCreate, URLResponse
import crud
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

# Create database tables if they don't exist
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Add exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"Global exception: {exc}")
    return {"detail": str(exc)}

@app.get("/")
def home():
    return {"message": "Welcome to ChinnaBit URL Shortener"}

# POST request to create a short URL
# curl -X POST -H "Content-Type: application/json" -d '{"original_url":"http://example.com"}' http://127.0.0.1:8000/shorten
@app.post("/shorten", response_model=URLResponse)
def shorten_url(url_data: URLCreate, db: Session = Depends(get_db)):
    new_url = crud.create_short_url(db, url_data.original_url)
    return new_url

# GET request to retrieve the original URL from the short URL
@app.get("/{short_url}")
def redirect_to_original(short_url: str, db: Session = Depends(get_db)):
    url = crud.get_original_url(db, short_url)
    if not url:
        raise HTTPException(status_code=404, detail="Short URL not found")
    return RedirectResponse(url.original_url)