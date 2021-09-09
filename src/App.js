import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function App() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  function CallApi() {
    axios
      .get("http://localhost:5000/")
      .then((response) => console.log(response.data));
  }
  async function CallProtectedApi() {
    const token = await getAccessTokenSilently();
    console.log(token);
    // axios
    //   .get("http://localhost:5000/protected")
    //   .then((response) => console.log(response.data));
  }

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
