import React from "react";

export default class Form extends React.Component {
  render() {
    return (
      <div className="form-group centerForm">
        <form>
          <label htmlFor="username">username</label>
          <input
            className="form-control"
            name="username"
            placeholder="username"
            value={this.props.username}
            onChange={(event) => this.props.change(event)}
          />
          <label htmlFor="password">password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="password"
            value={this.props.password}
            onChange={(event) => this.props.change(event)}
          />
          <button
            className="Mobilebtn btn--danger--solid btn--medium"
            style={{ margin: "8px", marginLeft: "0" }}
            onClick={(event) => {
              this.props.onSubmit(event);
            }}
          >
            Submit
          </button>
        </form>
        {this.props.error && (
          <div class="alert alert-danger" role="alert">
            {this.props.error}
          </div>
        )}
        <div>{this.props.text}</div>
      </div>
    );
  }
}
