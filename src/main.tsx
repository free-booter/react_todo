import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/variables.less";
import "normalize.css";
import "virtual:uno.css";
import "./styles/reset.less";
import "virtual:svg-icons-register";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
