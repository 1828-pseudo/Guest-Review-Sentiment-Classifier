import React, { useState } from "react";
import "./App.css";

function App() {
  const homestays = [
    "Mountain View Homestay",
    "Pine Retreat Homestay",
    "Riverstone Cottage",
    "Himalayan Nest",
  ];

  const [selectedHomestay, setSelectedHomestay] = useState(homestays[0]);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  const [reviews, setReviews] = useState({
    "Mountain View Homestay": [],
    "Pine Retreat Homestay": [],
    "Riverstone Cottage": [],
    "Himalayan Nest": [],
  });

  const addReview = () => {
    if (!review.trim()) {
      alert("Please enter a review.");
      return;
    }

    setReviews({
      ...reviews,
      [selectedHomestay]: [...reviews[selectedHomestay], review],
    });

    setReview("");
  };

  const analyzeSentiment = () => {
    setMessage(
      "Sentiment Analysis API will be integrated in the next phase."
    );
  };

  return (
    <div className="container">
      <h1>Guest Review Sentiment Classifier</h1>

      <div className="card">
        <label>Select Homestay</label>

        <select
          value={selectedHomestay}
          onChange={(e) => setSelectedHomestay(e.target.value)}
        >
          {homestays.map((home) => (
            <option key={home} value={home}>
              {home}
            </option>
          ))}
        </select>

        <label>Write Your Review</label>

        <textarea
          rows="5"
          placeholder="Share your experience..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="button-group">
          <button onClick={addReview}>Submit Review</button>

          <button
            className="analyze-btn"
            onClick={analyzeSentiment}
          >
            Analyze Sentiment
          </button>
        </div>

        {message && (
          <div className="message">
            {message}
          </div>
        )}
      </div>

      <div className="reviews-section">
        <h2>{selectedHomestay} Reviews</h2>

        {reviews[selectedHomestay].length === 0 ? (
          <p>No reviews submitted yet.</p>
        ) : (
          reviews[selectedHomestay].map((item, index) => (
            <div className="review-card" key={index}>
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;