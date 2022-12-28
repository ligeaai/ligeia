import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { logout } from "../../services/actions/auth";
import { setLoaderTrue } from "../../services/actions/loader";

import { ItemSperatorLine, Items } from "../../components";

const NestedMenu = (props) => {
  const dispatch = useDispatch();
  const { menuItems, isSubmenuOpen, themeMode, setSettingsMenuFunc } = props;
  const [menu, setMenu] = React.useState(menuItems.map(() => false));
  var menuValidator = menuItems.map(() => false);
  const [mainMenu, setMainMenu] = React.useState(true);
  const handleUserClick = (e) => {
    console.log("sads");
    if (!e.target.closest(".settingsMenu")) {
      setSettingsMenuFunc();
    }
  };

  useEffect(() => {
    if (isSubmenuOpen) {
      setMenu(menuItems.map(() => false));
      setMainMenu(true);
    }
  }, [isSubmenuOpen]);

  useEffect(() => {
    window.addEventListener("click", handleUserClick);
    return () => {
      window.removeEventListener("click", handleUserClick);
    };
  }, []);
  const myLogout = () => {
    dispatch(logout());
    dispatch(setLoaderTrue());
  };

  const MyBox = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.background.secondary,
    flexDirection: "column",
    width: "300px",
    paddingTop: "8px",
    paddingBottom: "8px",
  }));
  return (
    <MyBox container sx={{ marginTop: "-2px" }}>
      {mainMenu ? (
        <React.Fragment>
          <Items Icon={AccountCircleIcon} text="Your Profile" />
          <ItemSperatorLine />
          {menuItems.map((e, key) => {
            return (
              <React.Fragment key={key}>
                <Grid
                  className="settingsMenu"
                  item
                  sx={{
                    padding: "5px",
                    py: 1,
                    "&:hover": {
                      backgroundColor: "hover.primary",
                    },
                  }}
                >
                  <Grid
                    container
                    sx={{
                      alignItems: "center",
                      cursor: "pointer",
                      justifyContent: "space-between",
                    }}
                    onClick={() => {
                      menuValidator[key] = !menu[key];
                      setMenu(menuValidator);
                      setMainMenu(false);
                    }}
                  >
                    <Grid item>
                      <Grid
                        container
                        sx={{ color: "text.primary", alignItems: "center" }}
                      >
                        <Grid
                          item
                          sx={{
                            px: 1,
                            typography: "h6",
                            height: "24px",
                          }}
                        >
                          {e.icon}
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="body2"
                            sx={{ display: "inline" }}
                          >
                            {e.fixedText} :{" "}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              display: "inline",
                              textTransform: "capitalize",
                            }}
                          >
                            {e.text}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        px: 1,
                        color: "text.primary",
                        typography: "h6",
                        height: "24px",
                      }}
                    >
                      <KeyboardArrowRightIcon />
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}

          <ItemSperatorLine />
          <Items Icon={SettingsOutlinedIcon} text="Settings" />
          <ItemSperatorLine />
          <Items Icon={HelpOutlineIcon} text="Help" />
          <Items Icon={FeedbackOutlinedIcon} text="Send feedback" />
          <ItemSperatorLine />
          <Items Icon={ExitToAppIcon} text="Sign out" myFunction={myLogout} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {menu.map((key, i) => (
            <Grid
              className="settingsMenu"
              key={i}
              container
              sx={{
                display: key ? "flex" : "none",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Grid
                item
                sx={{
                  "&:hover": {
                    backgroundColor:
                      themeMode === "dark" ? "#ffffff22" : "#00000022",
                  },
                  width: "100%",
                  padding: "5px",
                }}
                onClick={() => {
                  setMainMenu(true);
                  menuValidator[i] = !menu[i];
                  setMenu(menuValidator);
                }}
              >
                <Grid
                  container
                  sx={{
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Grid item sx={{ mx: 1, color: "text.primary" }}>
                    <ArrowBackIcon />
                  </Grid>
                  <Grid item sx={{ color: "text.primary" }}>
                    {menuItems[i].fixedText}
                  </Grid>
                </Grid>
              </Grid>
              <ItemSperatorLine />
              {menuItems[i].subtable.length > 0 ? (
                menuItems[i].subtable.map((subValue, subKey) => {
                  console.log(subValue);
                  return (
                    <Grid
                      item
                      key={subKey}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor:
                            themeMode === "dark" ? "#ffffff22" : "#00000022",
                        },
                        padding: "8px",
                        width: "100%",
                      }}
                      onClick={() => {
                        menuItems[i].functions(subValue);
                      }}
                    >
                      <Grid container>
                        <Grid item sx={{ mx: 1 }}>
                          {subValue === menuItems[i].text ? (
                            <DoneIcon sx={{ color: "text.primary" }} />
                          ) : (
                            <DoneIcon sx={{ visibility: "hidden" }} />
                          )}
                        </Grid>
                        <Grid item>
                          <Typography
                            sx={{
                              textTransform: "capitalize",
                              color: "text.primary",
                            }}
                          >
                            {subValue}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })
              ) : (
                <></>
              )}
            </Grid>
          ))}
        </React.Fragment>
      )}
    </MyBox>
  );
};

export default NestedMenu;
