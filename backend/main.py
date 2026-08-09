from google import genai
from dotenv import load_dotenv
import os
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from fastapi import Request
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from slowapi import _rate_limit_exceeded_handler
from database import SessionLocal
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel , EmailStr, Field

from sqlalchemy import or_
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models.review import Review
from models.user import User
from models.accommodation import Accommodation
from database import Base

from jose import JWTError, jwt
from datetime import datetime, timedelta

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)
SECRET_KEY = "aivora_super_secret_key"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)

app = FastAPI(
    title="Aivora AI API"
)
limiter = Limiter(key_func=get_remote_address)

app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)

app.add_middleware(SlowAPIMiddleware)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

def verify_token(token: str = Depends(oauth2_scheme)):

    try:

        print("Received Token:", token)

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("Decoded Payload:", payload)

        email = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return email

    except JWTError as e:

        print("JWT Error:", e)

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )
    
# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AIReview(BaseModel):
    review: str


@app.post("/api/ai/analyze")
def ai_review(data: AIReview):

    sentiment = analyze_review(data.review)

    return {
        "sentiment": sentiment
    }

# Review Model
class ReviewCreate(BaseModel):
    name: str
    review: str
    sentiment: str
    accommodation_id: int

class RegisterUser(BaseModel):
    username: str = Field(min_length=3, max_length=30)
    full_name: str
    phone: str
    email: EmailStr
    password: str = Field(min_length=8)

from typing import Optional

class LoginUser(BaseModel):
    email: str | None = None
    phone: str | None = None
    password: str
# In-memory data
class AIRequest(BaseModel):
    review: str




# Root Route
@app.get("/")
def home():
    return {
    "message": "Welcome to Aivora AI API"
}


# GET all reviews
@app.get("/api/reviews", status_code=200)
def get_reviews(current_user: str = Depends(verify_token),db: Session = Depends(get_db)):

    reviews = db.query(Review).all()

    return reviews


# GET single review
@app.get("/api/reviews/{review_id}", status_code=200)
def get_review(
    review_id: int,
    current_user: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    review = db.query(Review).filter(
        Review.id == review_id
    ).first()

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return review


# POST create review
from fastapi import Depends

@app.post("/api/reviews", status_code=201)
def create_review(
    review: ReviewCreate,
    current_user: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    new_review = Review(
    name=review.name,
    review=review.review,
    sentiment=review.sentiment,
    accommodation_id=review.accommodation_id
)

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return new_review


# PUT update review
@app.put("/api/reviews/{review_id}", status_code=200)
def update_review(
    review_id: int,
    updated_review: ReviewCreate,
    current_user: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    review = db.query(Review).filter(
        Review.id == review_id
    ).first()

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    review.name = updated_review.name
    review.review = updated_review.review
    review.sentiment = updated_review.sentiment
    review.edited = True

    db.commit()
    db.refresh(review)

    return review


# DELETE review
@app.delete("/api/reviews/{review_id}", status_code=204)
def delete_review(
    review_id: int,
    current_user: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    review = db.query(Review).filter(
        Review.id == review_id
    ).first()
    

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    db.delete(review)
    db.commit()

    return


# SEARCH reviews
@app.get("/api/reviews/search/{keyword}", status_code=200)
def search_reviews(
    keyword: str,
    current_user: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    results = db.query(Review).filter(
        or_(
            Review.name.ilike(f"%{keyword}%"),
            Review.review.ilike(f"%{keyword}%")
        )
    ).all()

    return results
@app.post("/api/auth/register")
@limiter.limit("5/minute")
def register_user(
    request: Request,
    user: RegisterUser,
    db: Session = Depends(get_db)
):

    existing_email = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    existing_username = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already taken."
        )

    existing_phone = db.query(User).filter(
        User.phone == user.phone
    ).first()

    if existing_phone:
        raise HTTPException(
            status_code=400,
            detail="Phone number already registered."
        )

    hashed_password = pwd_context.hash(user.password)

    new_user = User(
        username=user.username,
        full_name=user.full_name,
        phone=user.phone,
        email=user.email,
        password=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully."
    }
@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()
    
@app.post("/api/auth/login")
def login_user(
    request: Request,
    user: LoginUser,
    db: Session = Depends(get_db)
):

    print("LOGIN REQUEST")
    print("Email:", user.email)
    print("Phone:", user.phone)

    # -----------------------------
    # EMAIL LOGIN
    # -----------------------------
    if user.email:

        db_user = db.query(User).filter(
            User.email == user.email
        ).first()

    # -----------------------------
    # PHONE LOGIN
    # -----------------------------
    elif user.phone:

        phone = user.phone.strip()

        # If user enters 6230514726,
        # convert it to +916230514726
        if phone.startswith("0"):
            phone = "+91" + phone[1:]

        elif phone.startswith("91") and not phone.startswith("+91"):
            phone = "+" + phone

        elif not phone.startswith("+"):
            phone = "+91" + phone

        print("Normalized Phone:", phone)

        db_user = db.query(User).filter(
            User.phone == phone
        ).first()

    else:
        raise HTTPException(
            status_code=400,
            detail="Email or phone number is required."
        )

    print("User found:", db_user)

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email/phone or password."
        )

    print("Stored Hash:", db_user.password)

    password_ok = pwd_context.verify(
        user.password,
        db_user.password
    )

    print("Password Match:", password_ok)

    if not password_ok:
        raise HTTPException(
            status_code=401,
            detail="Invalid email/phone or password."
        )

    token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": db_user.full_name
    }
@app.post("/api/ai/sentiment")
def analyze_sentiment(data: AIRequest):

    try:

        prompt = f"""
Analyze the sentiment of the following hotel review.

Review:
{data.review}

Reply with ONLY one word:
Positive
Negative
Neutral
"""

        response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents=prompt,
)

        return {
            "sentiment": response.text.strip()
        }

    except Exception as e:

        print("Gemini Error:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    
# ==========================
# ACCOMMODATIONS
# ==========================

@app.get("/api/accommodations")
def get_accommodations(
    city: str = None,
    type: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Accommodation)

    if city:
        query = query.filter(
            Accommodation.city.ilike(city)
        )

    if type:
        query = query.filter(
            Accommodation.type.ilike(type)
        )

    return query.all()
@app.get("/api/accommodations/test")
def test_accommodations(db: Session = Depends(get_db)):
    count = db.query(Accommodation).count()

    return {
        "database_connection": "working",
        "accommodation_count": count
    }