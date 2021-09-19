import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { getCookieValue } from "./utils";
export default class SearchPage extends React.Component {
  state = {
    search_data: [],
  };
  componentDidMount() {
    this.setState({ search_data: JSON.parse(getCookieValue("tv")) });
    console.log(getCookieValue("tv"));
  }
  adjustWatchList(action, element) {
    let searchCopy = [...this.state.search_data];
    searchCopy.forEach((x) => {
      if (x["imdbID"] == element["imdbID"]) {
        x["watchList"] = action;
      }
    });
    this.setState({ search_data: searchCopy });
  }
  render() {
    return (
      <div>
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
