import SearchPage from "./components/SearchPage";
import React from "react";
import SignupPage from "./components/signup_page";
import LoginPage from "./components/login_page";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./components/homepage";
import Dashboard from "./components/dashboard";
import How from "./components/how";
import Header from "./components/header_page"

export default function App() {
  return (
    <div>
      <BrowserRouter id="outer">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/how" exact component={How}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
//        <PrimarySearchAppBar />