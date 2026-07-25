import { Link } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

import heroImage from "../assets/hero.png";

import { analyzeReview } from "../services/aiService";

function Home() {
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!review.trim()) {
      alert("Please enter a review.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSentiment("");

      const result = await analyzeReview(review);

      setSentiment(result.sentiment);
    } catch (err) {
      setError("Failed to analyze review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Navbar />

      <Hero />

      <section className="px-8 py-12 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">
          Project Features
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card
            title="Sentiment Analysis"
            description="Analyze guest reviews and classify them as positive, negative, or neutral using machine learning."
            image={heroImage}
          />

          <Card
            title="Review Insights"
            description="Gain valuable insights from customer feedback and improve homestay services."
            image={heroImage}
          />
        </div>

        {/* AI Sentiment Analyzer */}
        <div className="max-w-3xl mx-auto mt-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-center dark:text-white">
            AI Review Sentiment Analyzer
          </h3>

          <textarea
            rows="5"
            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:text-white"
            placeholder="Write your hotel review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Analyzing..." : "Analyze Review"}
          </button>

          {sentiment && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold dark:text-white">
                Sentiment: {sentiment}
              </h2>
            </div>
          )}

          {error && (
            <div className="mt-6 text-center text-red-500">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/demo"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View UI Component Demo
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;