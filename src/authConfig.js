import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "c5755403-ca31-432f-b60e-bcf0fc64f7db", // Replaced with our client ID
        authority: "https://login.microsoftonline.com/48342a33-25ad-4d79-b854-4d66877e41c1", // Replaced with our tenant ID
        redirectUri: "https://victorious-glacier-0f67efe10.5.azurestaticapps.net", // Replaced with our redirect URI
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

export const msalInstance = new PublicClientApplication(msalConfig);
