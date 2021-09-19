import React from "react";
import AuthPage from "./auth_page";

export default class LoginPage extends React.Component {
  render() {
    return <AuthPage type="login" error="Login invalid" />;
  }
}
