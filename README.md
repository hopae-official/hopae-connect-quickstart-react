# Hopae Connect React Quickstart

A pre-configured project to demonstrate identity verification with Hopae Connect.

## Get Started

This project is designed to run instantly.

**1. Clone the repository**

```bash
git clone https://github.com/hopae-official/hopae-connect-quickstart-react.git
cd hopae-connect-react-quickstart
```

**2. Install and run**

```bash
pnpm install
pnpm run dev
```

Your browser will open to `http://localhost:5173`. Click the "Start Verification" button to see the flow in action.

## Use Your Own Credentials

1.  Copy the environment file template.

    ```bash
    cp .env.template .env
    ```

2.  Open the new `.env` file and add your credentials from the Hopae Connect dashboard.

    ```dotenv
    # .env
    VITE_HOPAE_CONNECT_URL="HOPAE_CONNECT_OIDC_URL"
    VITE_CLIENT_ID="YOUR_OWN_CLIENT_ID"
    VITE_CLIENT_SECRET="YOUR_OWN_CLIENT_SECRET"
    ```

## How It Works

This project uses a custom hook (`useHopaeConnect`) in `src/App.tsx` to manage the verification flow.

The component conditionally renders the UI based on whether the user has been verified, and then displays the key claims from the `/userinfo` endpoint in a clean card format in `src/UserInfoCard.tsx`.
