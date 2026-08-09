import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
  console.log("Dark button clicked");

  if (darkMode) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }

  setDarkMode(!darkMode);
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setDropdownOpen(false);

    navigate("/login");
  };

  return (
    <>
      {/* Top Yellow Bar */}

     <div className="bg-yellow-600 text-white px-10 py-3 flex justify-between items-center">

  <h1 className="text-3xl font-bold">
    AIVORA AI - AI powered guest review and booking system
  </h1>

  <button
    onClick={toggleTheme}
    className="border border-white rounded-lg px-5 py-2 font-medium hover:bg-white hover:text-yellow-600 transition"
  >
    {darkMode ? "☀ Light" : "🌙 Dark"}
  </button>

</div>

      {/* Navigation */}

      <nav className="bg-white dark:bg-black border-b border-gray-700 text-black dark:text-white">
        <div className="w-full flex items-center justify-between px-10 py-2">

          <div className="flex gap-10 text-lg font-medium">

            <Link
  to="/"
  className="text-black dark:text-white hover:text-yellow-400 transition"
>
  Home
</Link>

<Link
  to="/dashboard"
  className="text-black dark:text-white hover:text-yellow-400 transition"
>
  Dashboard
</Link>

<Link
  to="/about"
  className="text-black dark:text-white hover:text-yellow-400 transition"
>
  About
</Link>

<Link
  to="/demo"
  className="text-black dark:text-white hover:text-yellow-400 transition"
>
  Demo
</Link>

          </div>

          <div className="flex items-center gap-5">

            {/* Login/Profile */}

            {!token ? (

              <Link
                className="text-lg hover:text-yellow-400 transition"
                to="/login"
              >
                Login/Signup
              </Link>

            ) : (

              <div className="relative">

                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-yellow-500 text-black font-bold text-lg flex items-center justify-center hover:bg-yellow-400"
                >
                  {username?.charAt(0).toUpperCase()}
                </button>

                {dropdownOpen && (

                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">

                    <button
                      className="w-full text-left px-4 py-3 font-semibold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {username}
                    </button>

                    <hr />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 font-semibold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>

                  </div>

                )}

              </div>

            )}

            {/* Theme Button */}

           

          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;