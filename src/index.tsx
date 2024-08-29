import { createRoot } from "react-dom/client";
import App from "./App";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./authConfig";

const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);
    root.render(
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
    );
} else {
    console.error("Root container is missing in the HTML.");
}
