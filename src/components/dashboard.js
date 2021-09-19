import React from "react";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div className="grid">
          {this.state.search_data.map((element) => {
            return (
              <div key={element["imdbID"]} id="inner">
                <img src={element["Poster"]} alt={element["Title"]} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
