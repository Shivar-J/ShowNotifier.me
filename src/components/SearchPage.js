import SearchBar from "./search_bar";
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { processSearchData } from "./utils";
export default class SearchPage extends React.Component {
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
    if (response.ok) {
      let search_data = await response.json();
      if (search_data["Search"] == null) {
        return;
      } else {
        this.setState({
          search_data: processSearchData(search_data["Search"]),
        });
      }
    } else {
      alert("no show/movie exists with this name");
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  adjustWatchList(action, element) {
    let searchCopy = [...this.state.search_data];
    searchCopy.forEach((x) => {
      if (x["Title"] == element["Title"]) {
        x["watchList"] = action;
      }
    });
    this.setState({ search_data: searchCopy });
    console.log(element["Title"]);
    console.log(action);
  }
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
            return (
              <div key={element["imdbID"]} id="inner">
                <img src={element["Poster"]} alt={element["Title"]} />
                <Checkbox
                  checked={element["watchList"]}
                  onChange={() =>
                    this.adjustWatchList(!element["watchList"], element)
                  }
                  inputProps={{ "aria-label": element["Title"] }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
