import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/authService";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();

  const [usePhoneLogin, setUsePhoneLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    let loginData;

    if (usePhoneLogin) {
      loginData = {
        phone: phone,
        password: password,
      };
    } else {
      loginData = {
        email: email,
        password: password,
      };
    }

    console.log("LOGIN DATA:", loginData);

    const result = await loginUser(loginData);

    console.log("LOGIN RESPONSE:", result);
    console.log("TOKEN:", localStorage.getItem("token"));

    alert("Login Successful!");

    navigate("/dashboard");
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    console.error("RESPONSE:", err.response);

    alert(
      err.response?.data?.detail ||
      err.message ||
      "Login Failed"
    );
  }
};

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">

      <Navbar />

      <div className="flex-grow flex justify-center items-center py-10">

        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md"
        >

          <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">
            Welcome Back
          </h1>

          {/* EMAIL LOGIN */}
          {!usePhoneLogin ? (
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 mb-5 dark:bg-gray-700 dark:text-white"
              required
            />
          ) : (
            /* PHONE LOGIN */
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-3 mb-5 dark:bg-gray-700 dark:text-white"
              required
            />
          )}

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4 dark:bg-gray-700 dark:text-white"
            required
          />

          {/* SWITCH EMAIL / PHONE */}
          <p className="text-center mb-4">

            {usePhoneLogin ? (
              <>
                Login with email instead?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setUsePhoneLogin(false);
                    setPhone("");
                  }}
                  className="text-yellow-400 hover:underline"
                >
                  Login with Email
                </button>
              </>
            ) : (
              <>
                Login with number instead?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setUsePhoneLogin(true);
                    setEmail("");
                  }}
                  className="text-yellow-400 hover:underline"
                >
                  Login with Phone
                </button>
              </>
            )}

          </p>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

          {/* FORGOT PASSWORD */}
          <p className="text-center mt-4">
            <Link
              to="/login-otp"
              className="text-yellow-400 hover:underline"
            >
              Forgot Password? Login with OTP
            </Link>
          </p>

          {/* SIGN UP */}
          <p className="text-center mt-6 text-gray-400">

            New User?{" "}

            <Link
              to="/signup"
              className="text-yellow-400 font-semibold hover:underline"
            >
              Create an Account
            </Link>

          </p>

          {/* GOOGLE LOGIN */}
          <div className="mt-6 flex justify-center">

            <GoogleLogin
              onSuccess={(credentialResponse) => {

                localStorage.setItem(
                  "google_token",
                  credentialResponse.credential
                );

                alert("Google Login Successful!");

                navigate("/dashboard");
              }}

              onError={() => {
                alert("Google Login Failed");
              }}
            />

          </div>

        </form>

      </div>

      <Footer />

    </div>
  );
}

export default Login;