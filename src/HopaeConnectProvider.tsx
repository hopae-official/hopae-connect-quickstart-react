import React from "react";
import { AuthProvider, useAuth } from "react-oidc-context";

const oidcConfig = {
  authority: import.meta.env.VITE_HOPAE_CONNECT_URL,
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET, // only for demo
  redirect_uri: window.location.origin,
  scope: "openid idv",
};

// Step 1: Wrap your entire app with this provider in main.tsx
export function HopaeConnectProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider {...oidcConfig} loadUserInfo>
      {children}
    </AuthProvider>
  );
}

// Step 2: Use this hook in any component that needs verification
export function useHopaeConnect() {
  const auth = useAuth();

  return {
    isLoading: auth.isLoading,
    verifiedUser: auth.isAuthenticated ? auth.user : null,
    startVerification: () => {
      auth.signinRedirect({
        extraQueryParams: {
          prompt: "login",
        },
      });
    },
  };
}
