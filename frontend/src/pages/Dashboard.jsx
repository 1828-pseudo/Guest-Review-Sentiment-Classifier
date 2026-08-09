import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { analyzeReview } from "../services/aiService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";
import SearchDestination from "../components/SearchDestination";
import HotelCard from "../components/HotelCard";
import HotelDetails from "../components/HotelDetails";

function Dashboard() {

  const navigate = useNavigate();

  // ===========================
  // State Variables
  // ===========================

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [sentiment, setSentiment] = useState("Positive");
  const [aiLoading, setAiLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Destination & Hotel
  const [destination, setDestination] = useState("Mussoorie");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searched, setSearched] = useState(false);

  const [hotels, setHotels] = useState([]);
  const [hotelLoading, setHotelLoading] = useState(true);

  // ===========================
  // Initial Loading
  // ===========================

  useEffect(() => {
    fetchReviews();
    fetchHotels();
  }, []);

  // ===========================
  // Authentication
  // ===========================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // ===========================
  // Fetch Reviews
  // ===========================

  const fetchReviews = async () => {
    try {
      const response = await api.get("/api/reviews");

      setReviews(response.data);

    } catch (error) {
      toast.error("Failed to fetch reviews.");
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Fetch Hotels
  // ===========================

  const fetchHotels = async () => {
    try {
      setHotelLoading(true);

      const response = await api.get("/api/accommodations");

      console.log("ACCOMMODATIONS:", response.data);

      setHotels(response.data);

    } catch (error) {

      console.error(
        "Failed to fetch accommodations:",
        error
      );

      toast.error("Failed to load accommodations.");

    } finally {
      setHotelLoading(false);
    }
  };

  // ===========================
  // AI Review Analysis
  // ===========================

  const handleAIAnalyze = async () => {

    if (!reviewText.trim()) {
      toast.error("Please enter a review first.");
      return;
    }

    try {

      setAiLoading(true);

      const result = await analyzeReview(reviewText);

      setSentiment(result.sentiment);

      toast.success("AI sentiment generated!");

    } catch (err) {

      toast.error("AI analysis failed.");
      console.error(err);

    } finally {

      setAiLoading(false);

    }

  };

  // ===========================
  // Add Review
  // ===========================

  const addReview = async () => {

    if (!selectedHotel) {
      toast.error("Please select a hotel first.");
      return;
    }

    try {

      await api.post(
        "/api/reviews",
        {
          name,
          review: reviewText,
          sentiment,
          accommodation_id: selectedHotel.id,
        }
      );

      toast.success("Review Added!");

      setName("");
      setReviewText("");
      setSentiment("Positive");

      fetchReviews();

    } catch (err) {

      toast.error("Failed to add review.");
      console.error(err);

    }

  };

  // ===========================
  // Delete Review
  // ===========================

  const deleteReview = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/api/reviews/${id}`
      );

      toast.success(
        "Review deleted successfully!"
      );

      fetchReviews();

    } catch (err) {

      toast.error(
        "Failed to delete review."
      );

      console.error(err);

    }

  };

  // ===========================
  // Edit Review
  // ===========================

  const editReview = (review) => {

    setEditingId(review.id);
    setIsEditing(true);

    setName(review.name);
    setReviewText(review.review);
    setSentiment(review.sentiment);

  };

  // ===========================
  // Update Review
  // ===========================

  const updateReview = async () => {

    try {

      await api.put(
        `/api/reviews/${editingId}`,
        {
          name,
          review: reviewText,
          sentiment,
          accommodation_id: selectedHotel.id,
        }
      );

      toast.success("Review Updated!");

      setEditingId(null);
      setIsEditing(false);

      setName("");
      setReviewText("");
      setSentiment("Positive");

      fetchReviews();

    } catch (err) {

      toast.error(
        "Failed to update review."
      );

      console.error(err);

    }

  };

  // ===========================
  // Search Destination
  // ===========================

  const handleSearch = (destinationName) => {

    const formatted =
      destinationName.trim().toLowerCase();

    const matches = hotels.filter(
      (hotel) =>
        hotel.city?.toLowerCase() === formatted ||
        hotel.district?.toLowerCase() === formatted
    );

    console.log(
      "SEARCH:",
      formatted
    );

    console.log(
      "MATCHES:",
      matches
    );

    if (matches.length === 0) {

      toast.error(
        "No accommodations found for this destination."
      );

      setSearched(false);
      setSelectedHotel(null);

      return;
    }

    setDestination(matches[0].city);

    // Important:
    // Start by showing all hotels
    setSelectedHotel(null);

    setSearched(true);

  };

  // ===========================
  // Select Hotel
  // ===========================

  const handleHotelSelect = (hotel) => {

    console.log(
      "Selected hotel:",
      hotel
    );

    setSelectedHotel(hotel);

    // Scroll to top so selected hotel
    // starts from the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // ===========================
  // Selected Hotel Reviews
  // ===========================

  const selectedHotelReviews = selectedHotel
    ? reviews.filter(
        (review) =>
          review.accommodation_id ===
          selectedHotel.id
      )
    : [];

  // ===========================
  // Render
  // ===========================

  return (

    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">

      <Toast />

      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">

        {/* ===========================
            Search Destination
        =========================== */}

        <SearchDestination
          destination={destination}
          setDestination={setDestination}
          onSearch={handleSearch}
        />

        {/* ===========================
            HOTEL LIST
        =========================== */}

        {searched && !selectedHotel && (

          <section className="mt-8">

            <h2 className="text-3xl font-bold mb-6">
              Accommodations in {destination}
            </h2>

            {hotelLoading ? (

              <div className="text-center py-10">

                <p className="text-lg">
                  Finding the best stays...
                </p>

              </div>

            ) : (

              <div className="flex flex-col gap-4 max-w-4xl mx-auto">

                {hotels
                  .filter(
                    (hotel) =>
                      hotel.city?.toLowerCase() ===
                        destination.toLowerCase() ||
                      hotel.district?.toLowerCase() ===
                        destination.toLowerCase()
                  )
                  .map((hotel) => (

                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onSelect={handleHotelSelect}
                    />

                  ))}

              </div>

            )}

          </section>

        )}

        {/* ===========================
            SELECTED HOTEL PAGE
        =========================== */}

        {selectedHotel && (

          <section className="mt-8">

            {/* Back button */}

            <button
              onClick={() => {
                setSelectedHotel(null);
                setIsEditing(false);
                setEditingId(null);
              }}
              className="mb-6 text-yellow-600 font-semibold hover:text-yellow-700"
            >
              ← Back to {destination} accommodations
            </button>

            {/* Hotel Details */}

            <HotelDetails
              hotel={selectedHotel}
            />

            {/* ===========================
                REVIEWS
            =========================== */}

            <section className="mt-10">

              <h2 className="text-3xl font-bold mb-6">
                Reviews for {selectedHotel.name}
              </h2>

              {loading ? (

                <div className="flex justify-center py-20">
                  <Loader />
                </div>

              ) : selectedHotelReviews.length === 0 ? (

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">

                  <p className="text-gray-500">
                    No reviews yet for this accommodation.
                  </p>

                </div>

              ) : (

                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {selectedHotelReviews.map(
                    (review) => (

                      <div
                        key={review.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                      >

                        <div className="flex justify-between items-center mb-4">

                          <h2 className="text-xl font-bold">
                            {review.name}
                          </h2>

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                              review.sentiment ===
                              "Positive"
                                ? "bg-green-600"
                                : review.sentiment ===
                                  "Neutral"
                                ? "bg-yellow-500"
                                : "bg-red-600"
                            }`}
                          >
                            {review.sentiment}
                          </span>

                        </div>

                        <p className="text-gray-600 dark:text-gray-300">
                          {review.review}
                        </p>

                        {review.edited && (

                          <p className="text-sm text-gray-500 italic mt-2">
                            ✏ Edited
                          </p>

                        )}

                        <div className="mt-5 flex justify-end gap-3">

                          <button
                            onClick={() =>
                              editReview(review)
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                          >
                            ✏ Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteReview(review.id)
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                          >
                            🗑 Delete
                          </button>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </section>

            {/* ===========================
                ADD REVIEW
            =========================== */}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-10">

              <h2 className="text-2xl font-bold mb-5">
                {isEditing
                  ? "Edit Review"
                  : "Add Review"}
              </h2>

              <textarea
                className="border p-3 rounded w-full mb-4"
                placeholder="Write Review"
                rows="4"
                value={reviewText}
                onChange={(e) =>
                  setReviewText(e.target.value)
                }
              />

              <select
                className="border p-3 rounded w-full mb-4"
                value={sentiment}
                onChange={(e) =>
                  setSentiment(e.target.value)
                }
              >

                <option>
                  Positive
                </option>

                <option>
                  Neutral
                </option>

                <option>
                  Negative
                </option>

              </select>

              <div className="flex gap-3 flex-wrap">

                <button
                  onClick={handleAIAnalyze}
                  disabled={aiLoading}
                  className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 disabled:opacity-50"
                >
                  {aiLoading
                    ? "Analyzing..."
                    : "Analyze with AI"}
                </button>

                <button
                  onClick={
                    isEditing
                      ? updateReview
                      : addReview
                  }
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                  {isEditing
                    ? "Update Review"
                    : "Add Review"}
                </button>

                {isEditing && (

                  <button
                    onClick={() => {

                      setIsEditing(false);
                      setEditingId(null);
                      setName("");
                      setReviewText("");
                      setSentiment("Positive");

                    }}
                    className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>

                )}

              </div>

            </div>

          </section>

        )}

      </main>

      <Footer />

    </div>

  );

}

export default Dashboard;