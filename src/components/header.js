import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { processSearchData, setCookieValue } from "./utils";
import { Redirect } from "react-router";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default class PrimarySearchAppBar extends React.Component {
  defaultState = {
    "Search...": "",
    search_data: null,
    redirect: null,
  };

  state = {
    ...this.defaultState,
  };

  handleSubmit = async () => {
    let searchInput = this.state["Search..."];
    let body = { search_query: searchInput };
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

    setCookieValue("tv", JSON.stringify(this.state.search_data), 1800);

    this.setState({ redirect: "/search" });
    window.location.reload(false);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              ShowTracker.me
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={this.state["Search..."]}
                onChange={this.handleChange}
                name="Search..."
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
              <button onClick={this.handleSubmit}>submit</button>
            </Search>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
