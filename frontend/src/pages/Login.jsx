import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {

    e.preventDefault();

    try {

        await loginUser({
            email,
            password,
        });

        alert("Login Successful!");

        navigate("/dashboard");

    }

    catch (err) {

        alert(
            err.response?.data?.detail ||
            "Login Failed"
        );

    }

};
return (
  <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">

    <Navbar />

    <div className="flex-grow flex justify-center items-center">

      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 mb-5"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div>

    <Footer />

  </div>
);
}

export default Login;