import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

import heroImage from "../assets/hero.png";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <section className="px-8 py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">
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
      </section>

      <Footer />
    </>
  );
}

export default Home;