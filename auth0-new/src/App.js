import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginTest from "./Test/Login Test";
import Home from "./AppHome";
import Checkout from "./Test/Checkout";
import Pay from "./Test/PayHere";
import ThankYou from "./Test/ThankYou";
import Class from "./Test/Class";

import AdminSidebar from "./components/AdminComponents/sidebar/Sidebar";
import AdminTopbar from "./components/AdminComponents/topbar/Topbar";
import AdminHomeView from "./views/AdminPages/home/Home";
import UserHome from "./Test/UserDash";
import UserList from "./views/AdminPages/userList/UserList";
import User from "./views/AdminPages/user/User";
import NewUser from "./views/AdminPages/newUser/NewUser";
import ProductList from "./views/AdminPages/productList/ProductList";
import Product from "./views/AdminPages/product/Product";
import NewProduct from "./views/AdminPages/newProduct/NewProduct";

import { Payhere, AccountCategory } from "payhere-js-sdk";

Payhere.init("1218791", AccountCategory.SANDBOX);
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginTest />
          </Route>
          <Route exact path="/uer">
            <UserHome />
          </Route>
          <Route exact path="/payments">
            <Checkout />
          </Route>
          <Route exact path="/class">
            <Class />
          </Route>
          <Route exact path="/pay">
            <Pay />
          </Route>
          <Route exact path="/thankyou">
            <ThankYou />
          </Route>
          {/* // Admin panel routes */}
          <Route exact path="/admin">
            <AdminTopbar />
            <div className="container">
              <AdminSidebar />
              <Route exact path="/admin">
                <AdminHomeView />
              </Route>
              <Route path="/admin/users">
                <UserList />
              </Route>
              <Route path="/admin/user/:userId">
                <User />
              </Route>
              <Route path="/admin/newUser">
                <NewUser />
              </Route>
              <Route path="/admin/products">
                <ProductList />
              </Route>
              <Route path="/admin/product/:productId">
                <Product />
              </Route>
              <Route path="/admin/newproduct">
                <NewProduct />
              </Route>
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
