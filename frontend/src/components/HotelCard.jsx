function HotelCard({ hotel, onSelect }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      {/* Hotel Image */}
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        {/* Hotel Name */}
        <h2 className="text-2xl font-bold">
          {hotel.name}
        </h2>

        {/* Hotel Type */}
        <p className="text-blue-600 font-medium mt-1">
          {hotel.type}
        </p>

        {/* Rating */}
        <div className="flex items-center mt-3">

          <span className="text-yellow-500 text-lg">
            ⭐⭐⭐⭐⭐
          </span>

          <span className="ml-2 font-semibold">
            {hotel.rating}
          </span>

        </div>

        {/* Location */}
        <p className="text-gray-500 mt-3">
          📍 {hotel.location}
        </p>

        {/* Price */}
        <p className="text-2xl font-bold text-green-600 mt-3">
          ₹{hotel.price}
          <span className="text-base text-gray-500 font-normal">
            {" "}
            / night
          </span>
        </p>

        {/* Availability */}
        <p
          className={`mt-3 font-semibold ${
            hotel.availability === "Available"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          ● {hotel.availability}
        </p>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          {hotel.description}
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">

          <button
            onClick={() => onSelect(hotel)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            View Details
          </button>

          <button
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Book Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default HotelCard;