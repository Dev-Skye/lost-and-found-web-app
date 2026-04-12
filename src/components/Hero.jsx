import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [animationData, setAnimationData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/lotties/hero-animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  return (
    <section className="min-h-[80vh] grid md:grid-cols-2 items-center px-6 md:px-10 py-12 md:py-16 gap-10
    bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">

      {/* LEFT */}
      <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          Lost & <br />
          Found Items <br />
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            Made Easy
          </span>
        </h1>

        <p className="mt-4 text-gray-600 text-sm sm:text-base">
          Report lost and found items and help the people of Oulu find their belongings quickly.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
          <button
            onClick={() => navigate("/lost")}
            className="w-full sm:w-auto bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-6 py-3 rounded-xl text-base shadow-md transition"
          >
            Lost Items
          </button>

          <button
            onClick={() => navigate("/found")}
            className="w-full sm:w-auto bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white px-6 py-3 rounded-xl text-base shadow-md transition"
          >
            Found Items
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex justify-center">
        <lottie-player
          src="/lotties/hero-animation.json"
          background="transparent"
          speed="1"
          loop
          autoplay
          style={{ width: "100%", maxWidth: "400px", height: "auto" }}
        ></lottie-player>
      </div>

    </section>
  );
}

export default Hero;