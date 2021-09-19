import React from "react";
import AuthPage from "./auth_page";

export default class LoginPage extends React.Component {
  render() {
    return <AuthPage type="signup" error="username already exists" />;
  }
}
