function ReviewCard({ review, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center mb-4">

        <h3 className="text-xl font-bold">
          {review.name}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-white text-sm font-semibold
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
        <p className="text-sm text-gray-500 italic mt-3">
          ✏ Edited
        </p>
      )}

      <div className="flex justify-end gap-3 mt-5">

        <button
          onClick={() => onEdit(review)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          ✏ Edit
        </button>

        <button
          onClick={() => onDelete(review.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default ReviewCard;