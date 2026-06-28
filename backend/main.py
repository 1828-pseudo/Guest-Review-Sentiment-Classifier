from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Guest Review Sentiment Classifier API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Review Model
class Review(BaseModel):
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
    return {"message": "Guest Review Sentiment Classifier API Running"}


# GET all reviews
@app.get("/api/reviews", status_code=200)
def get_reviews():
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
@app.post("/api/reviews", status_code=201)
def create_review(review: Review):

    new_review = {
        "id": len(reviews) + 1,
        "name": review.name,
        "review": review.review,
        "sentiment": review.sentiment,
    }

    reviews.append(new_review)

    return new_review


# PUT update review
@app.put("/api/reviews/{review_id}", status_code=200)
def update_review(review_id: int, updated_review: Review):

    for review in reviews:

        if review["id"] == review_id:

            review["name"] = updated_review.name
            review["review"] = updated_review.review
            review["sentiment"] = updated_review.sentiment

            return review

    raise HTTPException(
        status_code=404,
        detail="Review not found"
    )


# DELETE review
@app.delete("/api/reviews/{review_id}", status_code=204)
def delete_review(review_id: int):

    for review in reviews:

        if review["id"] == review_id:
            reviews.remove(review)
            return

    raise HTTPException(
        status_code=404,
        detail="Review not found"
    )


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