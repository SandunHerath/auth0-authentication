import "./App.css";
import { Router, Route, Switch } from "react-router-dom";

import AdminSidebar from "./components/AdminComponents/sidebar/Sidebar";
import AdminTopbar from "./components/AdminComponents/topbar/Topbar";
import AdminHomeView from "./views/AdminPages/home/Home";
import UserList from "./views/AdminPages/userList/UserList";
import User from "./views/AdminPages/user/User";
import NewUser from "./views/AdminPages/newUser/NewUser";
import ProductList from "./views/AdminPages/productList/ProductList";
import Product from "./views/AdminPages/product/Product";
import NewProduct from "./views/AdminPages/newProduct/NewProduct";
function AdminRoute() {
  return (
    <>
      {/* Admin panel routes */}
      <Router>
        <AdminTopbar />
        <div className="container">
          <AdminSidebar />
          <Switch>
            <Route exact path="/">
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
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default AdminRoute;
