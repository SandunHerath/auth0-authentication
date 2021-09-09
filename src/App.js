import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();
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
        {
          isAuthenticated &&(
            <pre style={{ textAlign:'start' }}>
              {JSON.stringify(user,null,2)}
            </pre>
          )
        }
      </ul>
    </div>
  );
}

export default App;
