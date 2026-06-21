import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-4xl font-bold">About</h1>
        <p className="mt-4">
          This project helps homestays analyze guest reviews.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;