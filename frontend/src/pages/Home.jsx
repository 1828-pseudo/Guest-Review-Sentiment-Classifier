import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

import heroImage from "../assets/hero.png";

function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Navbar />

      <Hero />

      <section className="px-8 py-12 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">
          Project Features
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card
            title="Sentiment Analysis"
            description="Analyze guest reviews and classify them as positive, negative, or neutral using machine learning."
            image={heroImage}
          />

          <Card
            title="Review Insights"
            description="Gain valuable insights from customer feedback and improve homestay services."
            image={heroImage}
          />
        </div>

        {/* Demo Components Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/demo"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View UI Component Demo
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;