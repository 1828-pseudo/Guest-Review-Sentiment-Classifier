import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ComponentDemo from "./pages/ComponentDemo";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPhone from "./pages/LoginPhone";
import LoginOTP from "./pages/LoginOTP";
import HotelPage from "./pages/HotelPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login-phone" element={<LoginPhone />} />

        <Route path="/login-otp" element={<LoginOTP />} />

        <Route path="/dashboard/hotel/:hotelId" element={<HotelPage />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Second Protected Page */}
        <Route
          path="/demo"
          element={
            <ProtectedRoute>
              <ComponentDemo />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;