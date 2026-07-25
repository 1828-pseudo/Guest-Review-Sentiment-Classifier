import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId="543650089029-rru9u3hg5n4t3f88odt30jhtsi03mhmi.apps.googleusercontent.com"
  >
    <App />
  </GoogleOAuthProvider>
);