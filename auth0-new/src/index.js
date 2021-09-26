import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-43-hfsb7.us.auth0.com"
    clientId="9heiuqukHwIvzqb648HdyxHs5xFZcqTO"
    redirectUri={window.location.origin}
    audience="https://dev-43-hfsb7.us.auth0.com/api/v2/"
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

reportWebVitals();
