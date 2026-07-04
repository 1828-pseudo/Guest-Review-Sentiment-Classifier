import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";

function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/reviews"
      );

      setReviews(response.data);
      toast.success("Reviews loaded successfully!");
    } catch (error) {
      toast.error("Failed to fetch reviews.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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

        {/* Summary Cards */}

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