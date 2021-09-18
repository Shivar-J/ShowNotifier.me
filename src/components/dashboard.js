import SearchBar from "./search_bar";
import React from "react";
import Box from "@material-ui/core/Box";

export default class Dashboard extends React.Component {
  defaultState = {
    search_query: "",
    search_data: [],
  };
  state = {
    ...this.defaultState,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let body = { search_query: this.state.search_query };
    let response = await fetch("http://99.235.37.139:8000/api/search", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setState({ ...this.defaultState });
    let search_data = await response.json();
    if (search_data["Search"] == null) {
      return;
    } else {
      this.setState({ search_data: search_data["Search"] });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <SearchBar
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          search_query={this.state.search_query}
        />
        <div className="grid">
          {this.state.search_data.map((element) => {
            console.log(element["Poster"]);
            return (
              <div key={element["imdbID"]} id="inner">
                <img src={element["Poster"]} alt={element["Title"]} />
                <p>{element["Title"]}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
