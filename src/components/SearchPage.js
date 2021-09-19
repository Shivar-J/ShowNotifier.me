import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { getCookieValue, deleteCookieValue } from "./utils";
export default class SearchPage extends React.Component {
  state = {
    search_data: [],
  };
  async componentDidMount() {
    if (!getCookieValue("tv")) {
      return;
    }
    let search_data = JSON.parse(getCookieValue("tv"));
    deleteCookieValue("tv");
    let body = { username: getCookieValue("session") };
    let response = await fetch("http://99.235.37.139:8000/api/getWatchList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    response = await response.json();

    response.forEach((element) => {
      search_data.forEach((element2) => {
        if (element["showID"] == element2["imdbID"]) {
          element2["watchList"] = true;
        }
      });
    });
    this.setState({ search_data: search_data });
  }
  async adjustWatchList(action, element) {
    let searchCopy = [...this.state.search_data];
    searchCopy.forEach((x) => {
      if (x["imdbID"] == element["imdbID"]) {
        x["watchList"] = action;
      }
    });
    this.setState({ search_data: searchCopy });

    if (!getCookieValue("session")) {
      alert("not logged in, please login");
      return;
    } else {
      let body = {
        username: getCookieValue("session"),
        imdbID: element["imdbID"],
        type: action ? "add" : "remove",
      };
      let response = await fetch("http://99.235.37.139:8000/api/setWatchList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        alert(
          "connection error, try logging out and back in or retrying later"
        );
        return;
      }
    }
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
