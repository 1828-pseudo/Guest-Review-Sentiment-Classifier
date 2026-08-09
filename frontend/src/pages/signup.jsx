import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
  alert("Password must be at least 8 characters long.");
  return;
 }

    try {
      let cleanedPhone = phone.replace(/\s+/g, "");

  if (!cleanedPhone.startsWith("+91")) {
    cleanedPhone = "+91" + cleanedPhone;
  }
      await registerUser({
        username: email.split("@")[0],
        full_name: fullName,
        phone: phone,
        email: email,
        password: password,
      });

      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
       console.log(err);
  console.log(err.response);

  alert(
    err.response?.data?.detail ||
    err.message ||
    JSON.stringify(err.response?.data) ||
    "Registration Failed"
  );
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="flex justify-center items-center py-20 px-4">
        <form
          onSubmit={handleSignup}
          className="bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl p-8 border border-yellow-500"
        >
          <h1 className="text-4xl font-bold text-center text-yellow-400 mb-2">
            Create Account
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Join Aivora AI and discover the best homestays.
          </p>

          {/* Full Name */}
          <div className="mb-5">
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-5">
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition"
          >
            Create Account
          </button>

          <p className="text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;