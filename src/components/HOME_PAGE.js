import React from "react";

export default class Home extends React.Component {
  state = {
    homepage: [],
    redirect: null,
  };

  render() {
    return (
      <div>
        <div style={{ fontSize: "36px" }}>Welcome to ShowTracker.me</div>
        <div>
          <a href="/Signup">
            <button className="Mobilebtn btn--danger--solid btn--medium">
              Sign up
            </button>
          </a>
        </div>
        <p>Create an account to get started</p>
      </div>
    );
  }
}
