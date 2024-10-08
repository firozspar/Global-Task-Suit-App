import { PublicClientApplication } from "@azure/msal-browser";

const isLocalhost = window.location.hostname === "localhost";
const msalConfig = {
    auth: {
        clientId: "201f9e01-322a-402b-866d-00b52b65c91a", // Replaced with our Azure AD client ID
        authority: "https://login.microsoftonline.com/48342a33-25ad-4d79-b854-4d66877e41c1", // Replaced with our Azure AD tenant ID
        redirectUri: isLocalhost ? "http://localhost:3000" : "https://blue-desert-0e4d91a10.5.azurestaticapps.net" // Replaced with our Azure Static Web App Domain
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

export const initializeMsal = async () => {
    // Any required asynchronous operations can be handled here
    await msalInstance.initialize();
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
    scopes: ["User.Read"], // We can Add other scopes if needed
};
