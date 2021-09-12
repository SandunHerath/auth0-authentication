import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginTest from "./Test/Login Test";
import Home from "./AppHome";
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
