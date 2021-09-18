import React from "react";

export default class Search_bar extends React.Component {
  defaultState = {
    search_query: "",
  };
  state = {
    ...this.defaultState,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let body = { search_query: this.state.search_query };
    fetch("http://99.235.37.139:8000/api/search", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => this.setState({ ...this.defaultState }));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.search_query}
            name="search_query"
            onChange={this.handleChange}
          ></input>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}
