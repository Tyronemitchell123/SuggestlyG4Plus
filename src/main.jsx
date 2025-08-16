/**
 * @fileoverview Application Entry Point
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description Main entry point for the React application
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

import React from "react";
import ReactDOM from "react-dom/client";
import SuggestlyG4PlusSite from "./components/SuggestlyG4PlusSite.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SuggestlyG4PlusSite />
  </React.StrictMode>
);
