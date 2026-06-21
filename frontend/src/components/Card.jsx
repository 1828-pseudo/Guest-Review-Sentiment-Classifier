function Card({ title, description, image }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">
          {title}
        </h3>

        <p className="text-gray-600">
          {description}
        </p>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default Card;