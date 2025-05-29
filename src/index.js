import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './theme.css';
import './App.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);