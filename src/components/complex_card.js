import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { getCookieValue } from "./utils";

export default class MediaCard extends React.Component {
  state = {
    checked: true,
  };

  async adjustWatchList() {
    let body = {
      username: getCookieValue("session"),
      imdbID: this.props.show["imdbID"],
      type: "remove",
    };
    let response = await fetch("http://99.235.37.139:8000/api/setWatchList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      alert("connection error, try logging out and back in or retrying later");
      return;
    }
    this.setState({ checked: false });

    window.location.reload(false);
  }

  render() {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          image={this.props.show.Poster}
          alt={this.props.show.Title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {this.props.show.Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {this.props.show.Plot}
          </Typography>
          <Checkbox
            checked={this.state.checked}
            onChange={() => this.adjustWatchList()}
          />
        </CardContent>
      </Card>
    );
  }
}
