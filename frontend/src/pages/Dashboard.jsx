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
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import StatsCards from "../components/StatsCards";


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

  useEffect(() => {
    fetchReviews();
  }, []);

  // ===========================
  // Hotels (Temporary Data)
  // ===========================

 const hotels = [
  {
    id: 1,
    name: "Mountain View Resort",
    location: "Mussoorie",
    rating: 4.8,
    price: 4500,
    type: "Luxury Resort",
    availability: "Available",
    description: "Luxury mountain resort with breathtaking Himalayan views.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  },

  {
    id: 2,
    name: "Green Valley Homestay",
    location: "Mussoorie",
    rating: 4.5,
    price: 2200,
    type: "Homestay",
    availability: "Available",
    description: "Peaceful homestay surrounded by lush greenery.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },

  {
    id: 3,
    name: "Snow Peak Inn",
    location: "Mussoorie",
    rating: 4.4,
    price: 3000,
    type: "Hotel",
    availability: "Only 2 Rooms Left",
    description: "Comfortable stay with scenic mountain landscapes.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
  },

  {
    id: 4,
    name: "Lake View Palace",
    location: "Nainital",
    rating: 4.7,
    price: 5200,
    type: "Resort",
    availability: "Available",
    description: "Beautiful resort overlooking Naini Lake.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
  },

  {
    id: 5,
    name: "River Side Camp",
    location: "Rishikesh",
    rating: 4.6,
    price: 1800,
    type: "Camping",
    availability: "Available",
    description: "Adventure camping beside the Ganga River.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
  },

  {
    id: 6,
    name: "Himalayan Heights",
    location: "Auli",
    rating: 4.9,
    price: 6200,
    type: "Luxury Hotel",
    availability: "Available",
    description: "Premium ski resort with Himalayan snow views.",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
  },

  {
    id: 7,
    name: "Forest Retreat",
    location: "Dehradun",
    rating: 4.3,
    price: 2800,
    type: "Eco Stay",
    availability: "Available",
    description: "Nature-inspired eco stay surrounded by forests.",
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800",
  },
];



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
// Add Review
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

const addReview = async () => {

  try {

    await api.post(
  "/api/reviews",
      {
        name,
        review: reviewText,
        sentiment,
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
    toast.success("Review deleted successfully!");

    fetchReviews();

  } catch (err) {

    toast.error("Failed to delete review.");
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

    toast.error("Failed to update review.");
    console.error(err);

  }

};
const handleSearch = (destinationName) => {

  const formatted =
    destinationName.trim().toLowerCase();

  const match = hotels.find(
    hotel => hotel.location.toLowerCase() === formatted
  );

  if (!match) {
    toast.error("No hotels found for this destination.");
    setSearched(false);
    return;
  }

  setDestination(match.location);
  setSelectedHotel(null);
  setSearched(true);

};





  const positive = reviews.filter(
    (r) => r.sentiment === "Positive"
  ).length;

  const neutral = reviews.filter(
    (r) => r.sentiment === "Neutral"
  ).length;

  const negative = reviews.filter(
    (r) => r.sentiment === "Negative"
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">

      <Toast />

      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10">

        {/* Heading */}

        <div className="text-center mb-10">

          <h1 className="text-4xl md:text-5xl font-extrabold">
            Aivora
          </h1>

          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            Intelligent Booking & Guest Experience Platform
          </p>

        </div>
        
{/* Destination */}

<SearchDestination
  destination={destination}
  setDestination={setDestination}
  onSearch={handleSearch}
/>
{/* Hotels */}

{searched && (

  <div className="mb-10">

    <h2 className="text-3xl font-bold mb-6">
      Hotels in {destination}
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {hotels
        .filter((hotel) => hotel.location === destination)
        .map((hotel) => (

          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onSelect={setSelectedHotel}
          />

      ))}

    </div>

  </div>

)}

{/* Selected Hotel */}

{selectedHotel && (

  <HotelDetails hotel={selectedHotel} />

)}

{/* Add Review */}

{selectedHotel && (

<div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-10">

  <h2 className="text-2xl font-bold mb-5">
    {isEditing ? "Edit Review" : "Add Review"}
  </h2>

  <input
    className="border p-3 rounded w-full mb-4"
    placeholder="Guest Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <textarea
    className="border p-3 rounded w-full mb-4"
    placeholder="Write Review"
    rows="4"
    value={reviewText}
    onChange={(e) => setReviewText(e.target.value)}
  />

  <select
    className="border p-3 rounded w-full mb-4"
    value={sentiment}
    onChange={(e) => setSentiment(e.target.value)}
  >
    <option>Positive</option>
    <option>Neutral</option>
    <option>Negative</option>
  </select>

  <div className="flex gap-3 flex-wrap">

  <button
    onClick={handleAIAnalyze}
    disabled={aiLoading}
    className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 disabled:opacity-50"
  >
    {aiLoading ? "Analyzing..." : "Analyze with AI"}
  </button>

  <button
    onClick={isEditing ? updateReview : addReview}
    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
  >
    {isEditing ? "Update Review" : "Add Review"}
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

)}


        {/* Summary Cards */}

{selectedHotel && (

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
            <h3 className="text-gray-500">Total Reviews</h3>
            <p className="text-3xl font-bold mt-2">
              {reviews.length}
            </p>
          </div>

          <div className="bg-green-100 dark:bg-green-900 rounded-xl shadow p-6 text-center">
            <h3>Positive</h3>
            <p className="text-3xl font-bold mt-2">
              {positive}
            </p>
          </div>

          <div className="bg-yellow-100 dark:bg-yellow-900 rounded-xl shadow p-6 text-center">
            <h3>Neutral</h3>
            <p className="text-3xl font-bold mt-2">
              {neutral}
            </p>
          </div>

          <div className="bg-red-100 dark:bg-red-900 rounded-xl shadow p-6 text-center">
            <h3>Negative</h3>
            <p className="text-3xl font-bold mt-2">
              {negative}
            </p>
          </div>

        </div>
        )}

       {/* Reviews */}

{loading ? (

  <div className="flex justify-center py-20">
    <Loader />
  </div>

) : (

  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {reviews.map((review) => (

      <div
        key={review.id}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
      >

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            {review.name}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold text-white
            ${
              review.sentiment === "Positive"
                ? "bg-green-600"
                : review.sentiment === "Neutral"
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
    onClick={() => editReview(review)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
  >
    ✏ Edit
  </button>

  <button
    onClick={() => deleteReview(review.id)}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
  >
    🗑 Delete
  </button>

</div>

      </div>

    ))}

   </div>

)}

      </main>

      <Footer />

    </div>
  );
}

export default Dashboard;