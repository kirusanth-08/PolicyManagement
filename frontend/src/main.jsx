import React from "react";
import ReactDOM from "react-dom/client";  // Correct import for react-dom/client
import { BrowserRouter } from "react-router-dom";  // Ensure BrowserRouter is imported here
import App from "./App";
import "./index.css";  // Import the CSS file

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>  {/* BrowserRouter should be applied here only */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
