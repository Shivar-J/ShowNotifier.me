import React from "react";
import { Redirect } from "react-router-dom";
import Form from "./Form";
import "../bootstrap.css";
import { setCookieValue } from "./utils";
function hasWhiteSpace(s) {
  return /\s/g.test(s);
}
export default class AuthPage extends React.Component {
  Defaultstate = {
    username: "",
    password: "",
    error: "",
    redirect: null,
  };
  state = { ...this.Defaultstate };
  change = (event) => {
    this.setState({ error: "" });
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = async (event) => {
    event.preventDefault();
    if (!this.state.username || !this.state.password) {
      this.setState({ error: "Please fill out all the fields" });
      return;
    }
    if (hasWhiteSpace(this.state.username)) {
      this.setState({ error: "no spaces allowed in username" });
      return;
    }
    let body = {
      username: this.state.username,
      password: this.state.password,
      type: this.props.type,
    };
    let login_response = await fetch("http://99.235.37.139:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (login_response.ok) {
      login_response.text().then((session) => {
        setCookieValue("session", session, 604800);
      });
      this.setState({ redirect: "/dashboard" });
    } else {
      this.setState({
        error: this.props.error,
      });
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      let text;
      if (this.props.type === "login") {
        text = (
          <div style={{ fontWeight: 600 }}>
            Don't have an account? <a href="/Signup">Sign up</a>
          </div>
        );
      } else if (this.props.type == "signup") {
        text = (
          <div style={{ fontWeight: 600 }}>
            Already have an account? <a href="/Login">Login</a>
          </div>
        );
      }
      return (
        <div>
          {/* <Header/> */}
          <Form
            onSubmit={this.onSubmit}
            change={this.change}
            username={this.state.username}
            password={this.state.password}
            error={this.state.error}
            text={text}
          />
        </div>
      );
    }
  }
}
