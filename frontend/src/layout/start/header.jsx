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

import { changeTheme } from "../../services/actions/theme";
import { changeLanguage } from "../../services/actions/language";

import { SearchBarMobile, SearchBar } from "../../components";
import NestedMenu from "./nestedMenu";

const searchBarSize = {
  sm: { focus: "14ch", blur: "8ch" },
  md: { focus: "14ch", blur: "8ch" },
  lg: { focus: "28ch", blur: "16ch" },
  xl: { focus: "34ch", blur: "20ch" },
};

const Header = () => {
  const dispatch = useDispatch();
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
        px: { xs: 1, lg: 4, xl: 6 },
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
              <img src={logo} alt="logo" width={"36px"} />
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
                  typography: "h4",
                  cursor: "pointer",
                  display: { sx: "flex", md: "none" },
                }}
              />

              <Grid item>
                <Grid
                  container
                  sx={{
                    borderRadius: "10px",
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
                                typography: "body2",
                                textTransform: "capitalize",
                              }}
                            >
                              {e}
                              <KeyboardArrowDownIcon
                                sx={{
                                  color: "#ffffff",
                                  typography: "h6",
                                  display: { xs: "none", md: "inline" },
                                  marginLeft: "1.5px",
                                }}
                              />
                              <KeyboardArrowRightIcon
                                sx={{
                                  color: "#ffffff",
                                  typography: "h6",
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
                              top: { xs: "0px", md: "30px" },
                              left: { xs: "125px", md: "0px" },
                              display: openNavbar[key] ? "flex" : "none",
                            }}
                          >
                            {myNavbarItems[e].map((value, myKey) => (
                              <Grid
                                key={myKey}
                                sx={{
                                  typography: "subtitle1",
                                  "&:hover": {
                                    backgroundColor: "#3F3F3F",
                                  },
                                  px: 1.5,
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
            sx={{
              alignItems: "center",
              color: "#ffffff",
            }}
          >
            <Grid item>
              <SearchBar searchBarSize={searchBarSize} searchBarTheme="dark" />
            </Grid>
            <Grid item sx={{ ml: 1.5 }}>
              <Link
                underline="none"
                sx={{
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "14px",
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
                      subtable: [
                        "dark",
                        "light",
                        "temp",
                        "tempDark",
                        "temp2",
                        "tempDark2",
                      ],
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
