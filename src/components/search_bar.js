import React from "react";
import { TextField, Button } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
export default class SearchBar extends React.Component {
  render() {
    return (
      <form onSubmit={(event) => this.props.handleSubmit(event)}>
        <Stack direction="row" spacing={2} id="inner">
          <TextField
            value={this.props.search_query}
            name="search_query"
            onChange={(event) => this.props.handleChange(event)}
            variant="filled"
          ></TextField>
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            submit
          </Button>
        </Stack>
      </form>
    );
  }
}
