function StatsCards({ total, positive, neutral, negative }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
        <h3 className="text-gray-500">Total Reviews</h3>
        <p className="text-3xl font-bold mt-2">{total}</p>
      </div>

      <div className="bg-green-100 dark:bg-green-900 rounded-xl shadow p-6 text-center">
        <h3>Positive</h3>
        <p className="text-3xl font-bold mt-2">{positive}</p>
      </div>

      <div className="bg-yellow-100 dark:bg-yellow-900 rounded-xl shadow p-6 text-center">
        <h3>Neutral</h3>
        <p className="text-3xl font-bold mt-2">{neutral}</p>
      </div>

      <div className="bg-red-100 dark:bg-red-900 rounded-xl shadow p-6 text-center">
        <h3>Negative</h3>
        <p className="text-3xl font-bold mt-2">{negative}</p>
      </div>

    </div>
  );
}

export default StatsCards;