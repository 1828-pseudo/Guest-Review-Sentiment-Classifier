function ReviewForm({
  name,
  setName,
  reviewText,
  setReviewText,
  sentiment,
  setSentiment,
  isEditing,
  addReview,
  updateReview,
  cancelEdit,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-10">

      <h2 className="text-3xl font-bold mb-6">
        {isEditing ? "✏ Edit Review" : "📝 Write a Review"}
      </h2>

      <input
        className="border rounded-lg p-3 w-full mb-4"
        placeholder="Guest Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="border rounded-lg p-3 w-full mb-4"
        rows="5"
        placeholder="Write your experience..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <select
        className="border rounded-lg p-3 w-full mb-5"
        value={sentiment}
        onChange={(e) => setSentiment(e.target.value)}
      >
        <option>Positive</option>
        <option>Neutral</option>
        <option>Negative</option>
      </select>

      <div className="flex gap-4">

        <button
          onClick={isEditing ? updateReview : addReview}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          {isEditing ? "Update Review" : "Add Review"}
        </button>

        {isEditing && (

          <button
            onClick={cancelEdit}
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg"
          >
            Cancel
          </button>

        )}

      </div>

    </div>
  );
}

export default ReviewForm;