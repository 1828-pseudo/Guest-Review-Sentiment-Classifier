import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/ui/Loader";

function HotelPage() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotel();
    fetchReviews();
  }, [hotelId]);

  const fetchHotel = async () => {
    try {
      const response = await api.get(
        `/api/accommodations/${hotelId}`
      );

      setHotel(response.data);
    } catch (error) {
      console.error("Failed to fetch hotel:", error);
      toast.error("Failed to load hotel.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get("/api/reviews");

      const hotelReviews = response.data.filter(
        (review) =>
          review.accommodation_id === Number(hotelId)
      );

      setReviews(hotelReviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />

        <div className="flex justify-center py-20">
          <Loader />
        </div>

        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />

        <div className="text-center py-20">

          <h2 className="text-xl font-bold">
            Hotel not found
          </h2>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-5 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
          >
            ← Back to Dashboard
          </button>

        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">

      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-10">

        {/* Back button */}

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-gray-600 dark:text-gray-300 hover:text-yellow-600 font-medium"
        >
          ← Back to accommodations
        </button>


        {/* HOTEL DETAILS */}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">

          <img
            src={
              hotel.image_url ||
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200"
            }
            alt={hotel.name}
            className="w-full h-80 object-cover"
          />

          <div className="p-8">

            <h1 className="text-4xl font-bold">
              {hotel.name}
            </h1>

            <p className="text-yellow-600 font-semibold mt-2">
              {hotel.type}
            </p>


            {/* Rating */}

            <div className="flex items-center mt-4">

              <span className="text-yellow-500 text-xl">
                ⭐⭐⭐⭐⭐
              </span>

              <span className="ml-3 font-semibold">
                {hotel.rating ?? "New"}
              </span>

              {hotel.review_count > 0 && (
                <span className="ml-2 text-gray-500">
                  ({hotel.review_count} reviews)
                </span>
              )}

            </div>


            {/* Location */}

            <p className="text-gray-500 mt-4">
              📍 {hotel.address || `${hotel.city}, ${hotel.district}`}
            </p>


            {/* Description */}

            <p className="text-gray-700 dark:text-gray-300 mt-6 leading-relaxed">
              {hotel.description ||
                "Comfortable accommodation with a pleasant stay experience."}
            </p>


            {/* Price */}

            <p className="text-3xl font-bold text-green-600 mt-6">
              ₹{hotel.price_per_night}

              <span className="text-base text-gray-500 font-normal">
                {" "} / night
              </span>
            </p>


            {/* Availability */}

            <p
              className={`mt-4 font-semibold ${
                hotel.availability === "Available"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ● {hotel.availability}
            </p>


            {/* Amenities */}

            {hotel.amenities && (
              <div className="mt-6">

                <h3 className="text-xl font-bold mb-3">
                  Amenities
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {hotel.amenities}
                </p>

              </div>
            )}

          </div>

        </div>


        {/* REVIEWS */}

        <section className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Guest Reviews
          </h2>

          {reviews.length === 0 ? (

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">

              <p className="text-gray-500">
                No reviews yet for this accommodation.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
                >

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="text-xl font-bold">
                      {review.name}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
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
                    <p className="text-sm text-gray-500 italic mt-3">
                      ✏ Edited
                    </p>
                  )}

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default HotelPage;