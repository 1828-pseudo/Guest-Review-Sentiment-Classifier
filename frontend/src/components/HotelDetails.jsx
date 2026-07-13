function HotelDetails({ hotel }) {

  if (!hotel) return null;

  return (

    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-10">

      {/* Hotel Image */}

      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-[420px] object-cover"
      />

      <div className="p-8">

        {/* Hotel Name */}

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-4xl font-bold">
              {hotel.name}
            </h2>

            <p className="text-blue-600 mt-2 font-medium">
              {hotel.type}
            </p>

          </div>

          <div className="text-right">

            <p className="text-yellow-500 text-2xl">
              ⭐ {hotel.rating}
            </p>

            <p className="text-green-600 font-semibold mt-2">
              ● {hotel.availability}
            </p>

          </div>

        </div>

        {/* Location */}

        <p className="mt-5 text-gray-600 dark:text-gray-300">
          📍 {hotel.location}
        </p>

        {/* Description */}

        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-8">
          {hotel.description}
        </p>

        {/* Amenities */}

        <h3 className="text-2xl font-bold mt-10 mb-5">
          Amenities
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            📶 Free WiFi
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            🍽 Restaurant
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            🚗 Free Parking
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            🛏 Deluxe Rooms
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            🏊 Swimming Pool
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            🌄 Mountain View
          </div>

        </div>

        {/* Price */}

        <div className="flex justify-between items-center mt-10 border-t pt-8">

          <div>

            <p className="text-gray-500">
              Starting From
            </p>

            <h2 className="text-4xl font-bold text-green-600">
              ₹{hotel.price}
            </h2>

            <p className="text-gray-500">
              per night
            </p>

          </div>

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl text-lg"
          >
            Book Now
          </button>

        </div>

      </div>

    </div>

  );

}

export default HotelDetails;