import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Link } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import LanguageIcon from "@mui/icons-material/Language";
import history from "../../routers/history";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/Images/header/logo1.png";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import { changeTheme } from "../../services/actions/theme";
import { changeLanguage } from "../../services/actions/language";

import { setFocus, setBlur, setText } from "../../services/actions/searchBar";
import SearchBarMobile from "../../components/searchBar/searchBarMobile";
import NestedMenu from "./nestedMenu";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("md")]: {
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
    },
    [theme.breakpoints.up("sm")]: {
      width: "8ch",
      "&:hover": {
        width: "10ch",
      },
      "&:focus": {
        width: "14ch",
      },
    },
    [theme.breakpoints.up("lg")]: {
      width: "12ch",
      "&:hover": {
        width: "16ch",
      },
      "&:focus": {
        width: "28ch",
      },
    },
    [theme.breakpoints.up("xl")]: {
      width: "16ch",
      "&:hover": {
        width: "20ch",
      },
      "&:focus": {
        width: "34ch",
      },
    },
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const searchBarValue = useSelector((state) => state.searchBar.text);
  const isFocusSearchBar = useSelector((state) => state.searchBar.isFocus);
  const themeMode = useSelector((state) => state.theme.theme);
  const lang = useSelector((state) => state.lang.lang);
  const [menu, setMenu] = React.useState("none");
  const [settingsMenu, setSettingsMenu] = React.useState(false);
  const [openNavbar, setOpenNavbar] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  var openValid = [false, false, false, false, false, false];

  window.addEventListener("click", function (e) {
    if (!e.target.closest(".settingsMenu")) {
      setSettingsMenu(false);
    }
  });

  const themeSelect = (val) => {
    dispatch(changeTheme(val));
  };
  const langSelect = (val) => {
    dispatch(changeLanguage(val));
  };
  const locationSelect = (val) => {};
  const handleClick = (key) => {
    openValid[key] = true;
    setOpenNavbar(openValid);
  };
  const handleClose = (key) => {
    openValid[key] = false;
    setOpenNavbar(openValid);
  };
  var myNavbarItems = {
    Product: ["Product 1", "Product 2"],
    Learn: ["Learn 1", "Learn 2", "Learn 3", "Learn 4"],
    Stories: ["Stories 1", "Stories 2", "Stories 3"],
    Company: ["Company 1", "Company 2"],
    Partners: ["Partners 1", "Partners 2", "Partners 3", "Partners 4"],
    Contact: ["Contact 1", "Contact 2"],
  };
  return (
    <Grid
      sx={{
        py: 3,
        px: { xs: 2, lg: 4, xl: 6 },
        height: "100px",
      }}
    >
      <Grid
        container
        sx={{
          display: {
            xs: isFocusSearchBar ? "flex" : "none",
            md: "none",
          },
        }}
      >
        <SearchBarMobile theme="dark" />
      </Grid>
      <Grid
        container
        sx={{
          display: {
            xs: isFocusSearchBar ? "none" : "flex",
            md: "flex",
          },
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <Grid
            container
            sx={{
              color: "#ffffff",
            }}
          >
            <Grid
              item
              sx={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/");
              }}
            >
              <img src={logo} alt="logo" />
            </Grid>
            <Grid
              item
              sx={{
                ml: 2,
              }}
              onMouseEnter={() => {
                setMenu("flex");
              }}
              onMouseLeave={() => {
                setMenu("none");
              }}
            >
              <MenuIcon
                sx={{
                  color: "#ffffff",
                  fontSize: "40px",
                  cursor: "pointer",
                  display: { sx: "flex", md: "none" },
                }}
              />

              <Grid item>
                <Grid
                  container
                  sx={{
                    borderRadius: "10px",
                    ml: 2,
                    typography: {
                      xs: {
                        display: `${menu}`,
                        boxShadow: "0px 0px 4px 1.2px #888888",
                        flexDirection: "column",
                        left: "0px",
                        backgroundColor: "#0000008A",
                        position: "absolute",
                        width: "125px",
                      },
                      md: {
                        display: "flex",
                        boxShadow: "none",
                        flexDirection: "row",
                        backgroundColor: "inherit",
                        position: "relative",
                        width: "auto",
                      },
                    },
                  }}
                >
                  {Object.keys(myNavbarItems).map((e, key) => {
                    return (
                      <Grid
                        key={key}
                        item
                        id={key}
                        sx={{
                          cursor: "pointer",
                          width: { xs: "125px", sm: "auto" },
                          color: "#ffffff",
                          position: "relative",
                        }}
                        onMouseEnter={() => {
                          handleClick(key);
                        }}
                        onMouseLeave={() => {
                          handleClose(key);
                        }}
                      >
                        <Grid
                          container
                          sx={{
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Grid item sx={{ width: "100%" }}>
                            <Button
                              sx={{
                                color: "#ffffff",
                                width: "100%",
                                fontSize: {
                                  md: "12px",
                                  lg: "17px",
                                  xl: "19px",
                                },
                                textTransform: "capitalize",
                              }}
                            >
                              {e}
                              <KeyboardArrowDownIcon
                                sx={{
                                  color: "#ffffff",
                                  fontSize: {
                                    md: "16px",
                                    lg: "20px",
                                    xl: "22px",
                                  },
                                  display: { xs: "none", md: "inline" },
                                  marginLeft: "1.5px",
                                }}
                              />
                              <KeyboardArrowRightIcon
                                sx={{
                                  color: "#ffffff",
                                  fontSize: {
                                    md: "16px",
                                    lg: "20px",
                                    xl: "22px",
                                  },
                                  display: { xs: "inline", md: "none" },
                                  marginLeft: "1.5px",
                                }}
                              />
                            </Button>
                          </Grid>
                          <Grid
                            sx={{
                              flexDirection: "column",
                              backgroundColor: "#1F1F1F",
                              py: 1.5,
                              width: "max-content",
                              borderRadius: "8px",
                              position: "absolute",
                              top: { xs: "0px", md: "30px", lg: "45px" },
                              left: { xs: "125px", md: "0px" },
                              display: openNavbar[key] ? "flex" : "none",
                            }}
                          >
                            {myNavbarItems[e].map((value, myKey) => (
                              <Grid
                                key={myKey}
                                sx={{
                                  fontSize: {
                                    md: "12px",
                                    lg: "17px",
                                    xl: "19px",
                                  },
                                  "&:hover": {
                                    backgroundColor: "#3F3F3F",
                                  },
                                  px: 1.5,
                                  py: 0.5,
                                }}
                              >
                                {value}
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            spacing={1.5}
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
                  value={searchBarValue}
                  onFocus={(e) => {
                    dispatch(setFocus());
                  }}
                  onBlur={() => {
                    dispatch(setBlur());
                  }}
                  onChange={(e) => {
                    dispatch(setText(e.target.value));
                  }}
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
            </Grid>
            <Grid item>
              <Link
                underline="none"
                sx={{
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: { md: "12px", lg: "17px", xl: "19px" },
                }}
                onClick={() => history.push("/signin")}
              >
                Sign in
              </Link>
            </Grid>
            <Grid item className="settingsMenu">
              <Button
                sx={{
                  color: "#ffffff",
                }}
                onClick={(e) => {
                  setSettingsMenu(!settingsMenu);
                }}
              >
                <SettingsOutlinedIcon
                  sx={{ width: { md: "21px", lg: "27px", xl: "30px" } }}
                />
                <KeyboardArrowDownIcon
                  sx={{ fontSize: { md: "15px", lg: "21px", xl: "24" } }}
                />
              </Button>
              <Box
                sx={{
                  display: settingsMenu ? "flex" : "none",
                  position: "absolute",
                  right: { xs: "16px", lg: "32px", xl: "48px" },
                }}
              >
                <NestedMenu
                  menuItems={[
                    {
                      icon: <Brightness2OutlinedIcon />,
                      fixedText: "Appearance",
                      text: themeMode,
                      subtable: ["dark", "light"],
                      functions: themeSelect,
                    },
                    {
                      icon: <TranslateIcon />,
                      fixedText: "Language",
                      text: lang,
                      subtable: ["English", "Kazakça", "Rusça", "Türkçe"],
                      functions: langSelect,
                    },
                    {
                      icon: <LanguageIcon />,
                      fixedText: "Location",
                      text: "Canada",
                      subtable: ["Canada", "Kazakistan", "Türkiye"],
                      functions: locationSelect,
                    },
                  ]}
                  isOpen={settingsMenu}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
