import { useNavigate } from "react-router-dom";

function HotelCard({ hotel, onSelect }) {

  const navigate = useNavigate();

  const handleHotelClick = () => {
    onSelect(hotel);
    navigate("/dashboard", {
      state: { selectedHotel: hotel }
    });
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

      <div className="flex flex-col sm:flex-row">

        {/* Hotel Image */}
        <img
          src={
            hotel.image_url ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
          }
          alt={hotel.name}
          className="w-full sm:w-64 h-48 object-cover"
        />

        {/* Hotel Information */}
        <div className="p-4 flex-1">

          <h2 className="text-xl font-bold">
            {hotel.name}
          </h2>

          <p className="text-yellow-600 font-medium mt-1">
            {hotel.type}
          </p>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">
              ⭐⭐⭐⭐⭐
            </span>

            <span className="ml-2 font-semibold">
              {hotel.rating ?? "New"}
            </span>

            {hotel.review_count > 0 && (
              <span className="ml-2 text-gray-500 text-sm">
                ({hotel.review_count})
              </span>
            )}
          </div>

          {/* Location */}
          <p className="text-gray-500 mt-2">
            📍 {hotel.city}, {hotel.district}
          </p>

          {/* Price */}
          <p className="text-xl font-bold text-green-600 mt-2">
            ₹{hotel.price_per_night}
            <span className="text-sm text-gray-500 font-normal">
              {" "} / night
            </span>
          </p>

          {/* Availability */}
          <p
            className={`mt-2 font-semibold ${
              hotel.availability === "Available"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ● {hotel.availability}
          </p>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
            {hotel.description ||
              "Comfortable accommodation with a pleasant stay experience."}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">

            <button
              onClick={handleHotelClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              View Details
            </button>

            <button
              onClick={() => alert("Booking feature coming soon!")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Book Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HotelCard;