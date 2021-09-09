import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-zgsgae4p.us.auth0.com"
      clientId="i62Hj5XwRuPauKxu7HO5XOLcWqJcslhJ"
      redirectUri={window.location.origin}
      // onRedirectCallback=""
      audience="https://express.sample"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
