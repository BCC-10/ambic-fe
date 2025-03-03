import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app";


const rootElement = document.getElementById("root");

if(!rootElement) {
  throw new Error("No root element found");
}


const root = createRoot(rootElement);
root.render(
  <StrictMode >
    <App />
  </StrictMode>
);
