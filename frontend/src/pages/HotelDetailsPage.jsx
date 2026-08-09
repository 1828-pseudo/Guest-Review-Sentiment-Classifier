import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/ui/Loader";
import toast from "react-hot-toast";

function HotelDetailsPage() {

  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotelDetails();
  }, [hotelId]);

  const fetchHotelDetails = async () => {
    try {

      setLoading(true);

      // Get all accommodations
      const hotelResponse = await api.get("/api/accommodations");

      const foundHotel = hotelResponse.data.find(
        (item) => item.id === Number(hotelId)
      );

      if (!foundHotel) {
        toast.error("Hotel not found");
        navigate("/dashboard");
        return;
      }

      setHotel(foundHotel);

      // Get all reviews
      const reviewResponse = await api.get("/api/reviews");

      // Only reviews belonging to this hotel
      const hotelReviews = reviewResponse.data.filter(
        (review) =>
          review.accommodation_id === Number(hotelId)
      );

      setReviews(hotelReviews);

    } catch (error) {

      console.error("Failed to load hotel:", error);
      toast.error("Failed to load hotel details.");

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center min-h-[70vh]">
          <Loader />
        </div>

        <Footer />
      </>
    );
  }

  if (!hotel) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">

      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-10">

        {/* Back button */}

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-yellow-600 font-semibold hover:underline"
        >
          ← Back to accommodations
        </button>

        {/* Hotel Details */}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">

          <img
            src={
              hotel.image_url ||
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000"
            }
            alt={hotel.name}
            className="w-full h-72 object-cover"
          />

          <div className="p-8">

            <h1 className="text-4xl font-bold">
              {hotel.name}
            </h1>

            <p className="text-yellow-600 font-semibold mt-2">
              {hotel.type}
            </p>

            <p className="text-gray-500 mt-3">
              📍 {hotel.city}, {hotel.district}
            </p>

            <div className="flex items-center mt-4">
              <span className="text-yellow-500 text-xl">
                ⭐⭐⭐⭐⭐
              </span>

              <span className="ml-2 font-semibold">
                {hotel.rating ?? "New"}
              </span>

              {hotel.review_count > 0 && (
                <span className="ml-2 text-gray-500">
                  ({hotel.review_count} reviews)
                </span>
              )}
            </div>

            <p className="text-3xl font-bold text-green-600 mt-5">
              ₹{hotel.price_per_night}
              <span className="text-base text-gray-500 font-normal">
                {" "} / night
              </span>
            </p>

            <p
              className={`mt-3 font-semibold ${
                hotel.availability === "Available"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ● {hotel.availability}
            </p>

            <p className="text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
              {hotel.description ||
                "Comfortable accommodation with a pleasant stay experience."}
            </p>

            {hotel.address && (
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                <strong>Address:</strong> {hotel.address}
              </p>
            )}

            {hotel.amenities && (
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                <strong>Amenities:</strong> {hotel.amenities}
              </p>
            )}

            <button
              onClick={() => alert("Booking feature coming soon!")}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Book Now
            </button>

          </div>

        </div>

        {/* Reviews */}

        <section className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Reviews for {hotel.name}
          </h2>

          {reviews.length === 0 ? (

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
              <p className="text-gray-500">
                No reviews yet for this accommodation.
              </p>
            </div>

          ) : (

            <div className="space-y-5">

              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
                >

                  <div className="flex justify-between items-center">

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

                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {review.review}
                  </p>

                  {review.edited && (
                    <p className="text-sm text-gray-500 italic mt-2">
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

export default HotelDetailsPage;