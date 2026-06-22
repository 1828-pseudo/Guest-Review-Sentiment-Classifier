import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <h2 className="font-bold text-xl text-center md:text-left">
          Guest Review AI
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/demo">Demo</Link>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={toggleTheme}
            className="bg-white text-black px-3 py-1 rounded"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <div>👤</div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;