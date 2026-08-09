import homeBg from "../assets/lulu.png";

function Hero() {
  return (
    <section className="relative h-[calc(100vh-130px)] overflow-hidden">

      {/* Background */}
      <img
        src={homeBg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Transparent Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-center h-full px-8 text-center">

        <h1
          className="
          text-yellow-400
          font-black
          leading-none
          text-3xl
          md:text-3xl
          lg:text-[5rem]
          drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]
          "
        >
          Helping you find the best
          <br />
          homestays across Uttarakhand
        </h1>

        <p
          className="
          mt-6
          max-w-4xl
          text-white
          text-xl
          md:text-3xl
          leading-relaxed
          "
        >
          Discover trusted homestays, authentic local experiences,
          and AI-powered guest reviews to help you choose the perfect stay.
        </p>

      </div>

    </section>
  );
}

export default Hero;