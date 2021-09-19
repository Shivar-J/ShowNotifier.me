import React from "react";
import { getCookieValue } from "./utils";
import MediaCard from "./complex_card";
export default class Dashboard extends React.Component {
  state = {
    dashboard_data: [],
    redirect: null,
  };

  async componentDidMount() {
    if (!getCookieValue("session")) {
      this.setState({ redirect: "/" });
      return;
    }

    let body = { username: getCookieValue("session") };
    let response = await fetch("http://99.235.37.139:8000/api/getWatchList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      this.setState({ redirect: "/" });
      return;
    }

    response = await response.json();

    let body2 = { ids: response };
    let response2 = await fetch("http://99.235.37.139:8000/api/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body2),
    });

    if (!response2.ok) {
      this.setState({ redirect: "/" });
      return;
    }

    response2 = await response2.json();

    console.log(response2);
    this.setState({ dashboard_data: response2 });
  }

  render() {
    if (this.state.dashboard_data[0]) {
      return (
        <div className="grid2">
          {this.state.dashboard_data.map((element) => {
            return (
              <div id="inner">
                <MediaCard show={element} />
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
