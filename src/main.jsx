import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Pages/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode className="scroll-smooth">
    <App />
  </StrictMode>
);
