import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Portfolio from "./portfolio.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(Portfolio, null)
  )
);
