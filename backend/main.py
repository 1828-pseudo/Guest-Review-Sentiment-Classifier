from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sqlalchemy import or_
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models.review import Review
from database import Base

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
def get_reviews(db: Session = Depends(get_db)):

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