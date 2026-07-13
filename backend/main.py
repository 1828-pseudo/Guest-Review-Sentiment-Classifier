from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from database import SessionLocal
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sqlalchemy import or_
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models.review import Review
from models.user import User
from database import Base

from jose import JWTError, jwt
from datetime import datetime, timedelta

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

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return email

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )
    
# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Review Model
class ReviewCreate(BaseModel):
    name: str
    review: str
    sentiment: str

class RegisterUser(BaseModel):
    username: str
    email: str
    password: str


class LoginUser(BaseModel):
    email: str
    password: str

# In-memory data
reviews = [
    {
        "id": 1,
        "name": "John",
        "review": "Amazing stay and friendly staff.",
        "sentiment": "Positive",
    },
    {
        "id": 2,
        "name": "Sarah",
        "review": "Room was average.",
        "sentiment": "Neutral",
    },
]


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
def get_review(review_id: int):
    for review in reviews:
        if review["id"] == review_id:
            return review

    raise HTTPException(
        status_code=404,
        detail="Review not found"
    )


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
        sentiment=review.sentiment
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
def search_reviews(keyword: str):

    result = []

    for review in reviews:

        if (
            keyword.lower() in review["review"].lower()
            or keyword.lower() in review["name"].lower()
        ):
            result.append(review)

    return result

@app.post("/api/auth/register")
def register_user(user: RegisterUser, db: Session = Depends(get_db)):

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

    hashed_password = pwd_context.hash(user.password)

    new_user = User(
        username=user.username,
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
    user: LoginUser,
    db: Session = Depends(get_db)
):

    print("Email entered:", user.email)

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    print("User found:", db_user)

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    print("Stored Hash:", db_user.password)
    print("Entered Password:", user.password)

    password_ok = pwd_context.verify(
        user.password,
        db_user.password
    )

    print("Password Match:", password_ok)

    if not password_ok:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }