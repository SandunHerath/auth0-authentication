import React from "react";

import "antd/dist/antd.css";
import { Layout } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
const { Header, Content, Footer } = Layout;
function AdminHome() {
  const { logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function testone() {
    const token = await getAccessTokenSilently();
    console.log(token);
  }
  return (
    <Layout className="mainLayout">
      <Header />
      <Content>
        <div>
          <p>This is Admin Page</p>
        </div>
        <ul>
          <li>
            <button onClick={logout}>logout</button>
          </li>
          <li>
            <button onClick={testone}>check</button>
          </li>
          <h3>User is {isAuthenticated ? "Logged in" : "Not Logged in"}</h3>
          {isAuthenticated && (
            <pre style={{ textAlign: "start" }}>
              {JSON.stringify(user, null, 2)}
            </pre>
          )}
        </ul>
      </Content>
      <Footer />
    </Layout>
  );
}

export default AdminHome;
