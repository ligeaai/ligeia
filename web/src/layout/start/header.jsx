import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Grid, Link } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import history from "../../routers/history";

import logo from "../../assets/Images/header/logo1.png";
import langIcon from "../../assets/Images/header/Vector1.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
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
  color: "rgba(0,0,0,15)",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const header = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
        padding: "2% 7% 0 3.5%",
      }}
    >
      <Grid item>
        <Grid
          container
          spacing={3}
          sx={{
            alignItems: "center",
            color: "#ffffff",
          }}
        >
          <Grid item>
            <img src={logo} alt="logo" />
          </Grid>
          <Grid item>Product</Grid>
          <Grid item>Learn</Grid>
          <Grid item>Stories</Grid>
          <Grid item>Company</Grid>
          <Grid item>Partners</Grid>
          <Grid item>Contact Us</Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: "center",
            color: "#ffffff",
          }}
        >
          <Grid item>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Grid>
          <Grid item>
            <Link
              underline="none"
              sx={{ color: "#ffffff" }}
              onClick={() => history.push("login")}
            >
              Sign in
            </Link>
          </Grid>
          <Grid item>
            <img src={langIcon} alt="langIcon" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default header;
