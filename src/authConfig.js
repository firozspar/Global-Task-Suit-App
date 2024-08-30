import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "201f9e01-322a-402b-866d-00b52b65c91a", // Replaced with our client ID
        authority: "https://login.microsoftonline.com/48342a33-25ad-4d79-b854-4d66877e41c1", // Replaced with our tenant ID
        redirectUri: "https://blue-desert-0e4d91a10.5.azurestaticapps.net/.auth/login/aad/callback", // Replaced with our redirect URI
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

export const msalInstance = new PublicClientApplication(msalConfig);
