import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 🧠 import BrowserRouter
import "./index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Wrap App inside BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
