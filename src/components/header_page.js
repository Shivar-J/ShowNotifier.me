import { Link, Box, Flex, Text, Button, Stack, Input } from "@chakra-ui/react"
import Logo from "./logo"
import * as React from "react";
import { processSearchData, setCookieValue } from "./utils";
import { Redirect } from "react-router";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="200px"
        color={["white", "white", "primary.500", "primary.500"]}
      />
      <SearchBar />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

class SearchBar extends React.Component {
  defaultState = {
    "Search...": "",
    search_data: null,
    redirect: null,
  };
  state = {
    ...this.defaultState,
  };

  handleSubmit = async () => {
    let searchInput = this.state["Search....."];
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
      alert("No Show/Movie Exists With This Name");
    }

    setCookieValue("tv", JSON.stringify(this.state.search_data), 1800);

    this.setState({ redirect: "/search" });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return(
      <Box sx={{flexGrow: 1}}>
        {this.state.redirect ? <Redirect to={this.state.redirect} /> : null}
        <Input class="center"
            value={this.state["Enter Show/Movie"]}
            onChange={this.handleChange}
            name="Enter Show/Movie"
            placeholder="Search.."
          >
        </Input>
      </Box>
    );
  }
}

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="36px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/how">How It works </MenuItem>
        <MenuItem to="/signup" isLast>
          <Button
            size="sm"
            rounded="md"
            color={["primary.500", "primary.500", "white", "white"]}
            bg={["white", "white", "primary.500", "primary.500"]}
            _hover={{
              bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
            }}
          >
            Create Account
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;