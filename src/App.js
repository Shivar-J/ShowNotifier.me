import SearchPage from "./components/SearchPage";
import React from "react";
import SignupPage from "./components/signup_page";
import LoginPage from "./components/login_page";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrimarySearchAppBar from "./components/header";
function App() {
  return (
    <div>
      <PrimarySearchAppBar />
      <BrowserRouter id="outer">
        <Switch>
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
