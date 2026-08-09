function HotelDetails({ hotel }) {
  if (!hotel) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mt-10">

      <div className="grid md:grid-cols-2 gap-8">

        {/* Image */}
        <div>
          <img
            src={
              hotel.image_url ||
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000"
            }
            alt={hotel.name}
            className="w-full h-80 object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div>

          <p className="text-yellow-600 font-semibold mb-2">
            {hotel.type}
          </p>

          <h2 className="text-3xl font-bold mb-3">
            {hotel.name}
          </h2>

          {/* Location */}
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            📍 {hotel.address || `${hotel.city}, ${hotel.district}, ${hotel.state}`}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-4">

            <span className="text-yellow-500 text-xl">
              ⭐⭐⭐⭐⭐
            </span>

            <span className="ml-2 font-bold">
              {hotel.rating ?? "New"}
            </span>

            {hotel.review_count > 0 && (
              <span className="ml-2 text-gray-500">
                ({hotel.review_count} reviews)
              </span>
            )}

          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-green-600 mb-4">
            ₹{hotel.price_per_night}
            <span className="text-base text-gray-500 font-normal">
              {" "}
              / night
            </span>
          </p>

          {/* Availability */}
          <p
            className={`font-semibold mb-5 ${
              hotel.availability === "Available"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ● {hotel.availability}
          </p>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
            {hotel.description ||
              "A comfortable accommodation for your stay."}
          </p>

          {/* Amenities */}
          {hotel.amenities && (
            <div className="mb-6">

              <h3 className="font-bold text-lg mb-2">
                Amenities
              </h3>

              <div className="flex flex-wrap gap-2">

                {hotel.amenities
                  .split(",")
                  .map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm"
                    >
                      {amenity.trim()}
                    </span>
                  ))}

              </div>

            </div>
          )}

          {/* Book */}
          <button
            onClick={() => alert("Booking feature coming soon!")}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
          >
            Book Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default HotelDetails;