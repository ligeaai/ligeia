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

import SearchBar from "../../components/searchBar/searchBar";
import SearchBarMobile from "../../components/searchBar/searchBarMobile";
import NestedMenu from "./nestedMenu";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const lang = useSelector((state) => state.lang.lang);
  const [search, setSearch] = React.useState(false);
  const [menu, setMenu] = React.useState("none");
  const [settingsMenu, setSettingsMenu] = React.useState(null);
  const [open, setOpen] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  var openValid = [false, false, false, false, false, false];
  // const searchBar = (val) => {
  //   setSearch(val);
  // };
  const themeSelect = (val) => {
    dispatch(changeTheme(val));
  };
  const langSelect = (val) => {
    dispatch(changeLanguage(val));
  };
  const locationSelect = (val) => {};
  const handleClick = (key) => {
    openValid[key] = true;
    setOpen(openValid);
  };
  const handleClose = (key) => {
    openValid[key] = false;
    setOpen(openValid);
  };
  var myObject = {
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
        height: "150px",
      }}
    >
      <Grid
        container
        sx={{
          display: {
            xs: search ? "flex" : "none",
            md: "none",
          },
        }}
        onBlur={() => {
          setSearch(false);
        }}
      >
        <SearchBarMobile />
      </Grid>
      <Grid
        container
        sx={{
          display: {
            xs: search ? "none" : "flex",
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
            >
              <MenuIcon
                sx={{
                  color: "#ffffff",
                  fontSize: "40px",
                  cursor: "pointer",
                  display: { sx: "flex", md: "none" },
                }}
                onClick={() => {
                  setMenu(menu === "none" ? "flex" : "none");
                }}
              />
            </Grid>

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
                      padding: "10px",
                      flexDirection: "column",
                      top: "80px",
                      left: "0px",
                      backgroundColor: "#0000008A",
                      position: "absolute",
                      width: "max-content",
                    },
                    md: {
                      display: "flex",
                      boxShadow: "none",
                      padding: "0px",
                      top: "0px",
                      flexDirection: "row",
                      backgroundColor: "inherit",
                      position: "relative",
                      width: "auto",
                    },
                  },
                }}
              >
                {Object.keys(myObject).map((e, key) => {
                  return (
                    <Grid
                      key={key}
                      item
                      id={key}
                      sx={{
                        cursor: "pointer",
                        zIndex: "3",
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
                        sx={{ flexDirection: "column", alignItems: "center" }}
                      >
                        <Grid item>
                          <Button
                            sx={{
                              color: "#ffffff",
                              fontSize: { md: "12px", lg: "17px", xl: "19px" },
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
                            top: { xs: "0px", lg: "45px" },
                            left: { xs: "120px", lg: "0px" },
                            display: open[key] ? "flex" : "none",
                          }}
                        >
                          {myObject[e].map((value, myKey) => (
                            <Grid
                              key={myKey}
                              sx={{
                                zIndex: 1512320,
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
              <SearchBar />
            </Grid>
            <Grid item>
              <Link
                underline="none"
                sx={{
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: { md: "12px", lg: "17px", xl: "19px" },
                }}
                onClick={() => history.push("login")}
              >
                Sign in
              </Link>
            </Grid>
            <Grid item id="settingsMenu">
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
                  dict={[
                    {
                      icon: <Brightness2OutlinedIcon />,
                      fixedText: "Appearance",
                      text: theme,
                      subtable: ["dark", "light"],
                      functions: themeSelect,
                    },
                    {
                      icon: <TranslateIcon />,
                      fixedText: "Language",
                      text: "English",
                      subtable: ["English"],
                      functions: langSelect,
                    },
                    {
                      icon: <LanguageIcon />,
                      fixedText: "Location",
                      text: "Canada",
                      subtable: ["Canada"],
                      functions: locationSelect,
                    },
                  ]}
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
