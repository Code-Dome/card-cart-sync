import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { SettingsProvider } from "./contexts/SettingsContext";
import App from "./App.tsx";
import "./index.css";

const PUBLISHABLE_KEY = "pk_test_ZXhwZXJ0LW1hbGFtdXRlLTIzLmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </ClerkProvider>
);
