import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { HopaeConnectProvider } from "./HopaeConnectProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HopaeConnectProvider>
      <App />
    </HopaeConnectProvider>
  </StrictMode>
);
