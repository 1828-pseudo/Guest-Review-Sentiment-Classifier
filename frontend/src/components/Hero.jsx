function Hero() {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-20 text-center transition-colors duration-300">
      <h1 className="text-5xl font-bold mb-4 text-black dark:text-white">
        Guest Review Sentiment Classifier
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Analyze guest reviews and understand customer sentiment.
      </p>

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </section>
  );
}

export default Hero;