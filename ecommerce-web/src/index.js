import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Certifique-se de que este arquivo existe
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
