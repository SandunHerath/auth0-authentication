import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";

import AppHeader from "./components/common/header";
import AppFooter from "./components/common/footer";
import AppHome from "./views/home";

import { Layout } from "antd";
const { Header, Content, Footer } = Layout;
function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/login"> Go to Login</Link>
    </div>
  );
}

export default Home;
