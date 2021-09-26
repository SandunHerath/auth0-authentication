import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function LoginTest() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  async function CallApi() {
    try {
      const res = await axios.get("http://localhost:5000/");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function CallProtectedApi() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:5000/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getPermitions() {
   // const USER_ID = user.sub;

    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:5000/perm", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <h2>Auth0 authentication</h2>
      <ul>
        <li>
          <button onClick={loginWithPopup}>LoginWithPopup</button>
        </li>
        <li>
          <button onClick={loginWithRedirect}>loginWithRedirect</button>
        </li>
        <li>
          <button onClick={logout}>logout</button>
        </li>
        <h3>User is {isAuthenticated ? "Logged in" : "Not Logged in"}</h3>
        {isAuthenticated && (
          <pre style={{ textAlign: "start" }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        )}
      </ul>

      <button onClick={CallApi}>Call Api</button>
      <button onClick={CallProtectedApi}>Call Protected Api</button>
      <button onClick={getPermitions}>getPermitions</button>
    </div>
  );
}

export default LoginTest;
