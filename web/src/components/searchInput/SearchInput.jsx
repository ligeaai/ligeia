import React from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
const SearchInput = () => {
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
    color: "#ffffff",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("xs")]: {
        width: "0ch",
        "&:focus": {
          width: "10ch",
        },
      },
      [theme.breakpoints.up("sm")]: {
        width: "8ch",
        "&:hover": {
          width: "9.5ch",
        },
        "&:focus": {
          width: "11ch",
        },
      },
      [theme.breakpoints.up("lg")]: {
        width: "12ch",
        "&:hover": {
          width: "14ch",
        },
        "&:focus": {
          width: "18ch",
        },
      },
      [theme.breakpoints.up("xl")]: {
        width: "16ch",
        "&:hover": {
          width: "20ch",
        },
        "&:focus": {
          width: "24ch",
        },
      },
    },
  }));
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        sx={{
          input: {
            "&:hover": {
              "&::placeholder": {
                opacity: 1,
              },
            },
            "&:focus": {
              "&::placeholder": {
                opacity: 1,
              },
            },
          },
        }}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchInput;
