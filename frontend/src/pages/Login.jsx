import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold">Login</h1>

        <p className="mt-4">
          User authentication will be added later.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Login;