import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Box, Grid, Typography } from "@mui/material";
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

const NestedMenu = (props) => {
  const dispatch = useDispatch();
  const { dict, isOpen, theme } = props;
  const [menu, setMenu] = React.useState(dict.map(() => false));
  var menuValidator = dict.map(() => false);
  const [mainMenu, setMainMenu] = React.useState(true);
  useEffect(() => {
    if (isOpen) {
      setMenu(dict.map(() => false));
      setMainMenu(true);
    }
  }, [isOpen]);
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        backgroundColor: "primary.contrastText",
        width: "250px",
        pt: 1,
      }}
    >
      {mainMenu ? (
        <React.Fragment>
          <Grid
            className="settingsMenu"
            item
            sx={{
              padding: "5px",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#ffffff22" : "#00000022",
              },
            }}
          >
            {" "}
            <Grid
              container
              spacing={1}
              sx={{
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "space-between",
              }}
              onClick={() => {
                //todo route profile file
              }}
            >
              <Grid item>
                <Grid
                  container
                  sx={{ alignItems: "center", color: "text.primary" }}
                >
                  <Grid item sx={{ px: 1 }}>
                    <AccountCircleIcon />
                  </Grid>
                  <Grid item>Your Profile</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              border: "none",
              height: "1px",
              backgroundColor: "#3F3F3F",
              width: "100%",
              my: 1,
            }}
          />
          {dict.map((e, key) => {
            return (
              <React.Fragment key={key}>
                <Grid
                  className="settingsMenu"
                  item
                  sx={{
                    padding: "5px",
                    "&:hover": {
                      backgroundColor:
                        theme === "dark" ? "#ffffff22" : "#00000022",
                    },
                  }}
                >
                  <Grid
                    container
                    spacing={1}
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
                      <Grid container sx={{ color: "text.primary" }}>
                        <Grid item sx={{ px: 1 }}>
                          {e.icon}
                        </Grid>
                        <Grid item>
                          {e.fixedText} :{" "}
                          <Typography
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
                    <Grid item sx={{ px: 1, color: "text.primary" }}>
                      <KeyboardArrowRightIcon />
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
          <Box
            sx={{
              border: "none",
              height: "1px",
              backgroundColor: "#3F3F3F",
              width: "100%",
              marginY: 1,
            }}
          />
          <Grid
            item
            sx={{
              padding: "5px",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#ffffff22" : "#00000022",
              },
              marginBottom: "8px",
            }}
          >
            <Grid
              container
              sx={{
                alignItems: "center",
                cursor: "pointer",
                color: "text.primary",
              }}
            >
              <Grid item sx={{ mx: 1 }}>
                <SettingsOutlinedIcon />
              </Grid>
              <Grid item>Settings</Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              border: "none",
              height: "1px",
              backgroundColor: "#3F3F3F",
              width: "100%",
              marginBottom: 1,
            }}
          />
          <Grid
            item
            sx={{
              padding: "5px",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#ffffff22" : "#00000022",
              },
            }}
          >
            <Grid
              container
              sx={{
                alignItems: "center",
                cursor: "pointer",
                color: "text.primary",
              }}
            >
              <Grid item sx={{ mx: 1 }}>
                <HelpOutlineIcon />
              </Grid>
              <Grid item>Help</Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              padding: "5px",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#ffffff22" : "#00000022",
              },
              marginBottom: "8px",
            }}
          >
            <Grid
              container
              sx={{
                alignItems: "center",
                cursor: "pointer",
                color: "text.primary",
              }}
            >
              <Grid item sx={{ mx: 1 }}>
                <FeedbackOutlinedIcon />
              </Grid>
              <Grid item>Send feedback</Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              border: "none",
              height: "1px",
              backgroundColor: "#3F3F3F",
              width: "100%",
              mb: 1,
            }}
          />
          <Grid
            item
            sx={{
              padding: "5px",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#ffffff22" : "#00000022",
              },
              marginBottom: "8px",
            }}
            onClick={() => {
              dispatch(logout());
              dispatch(setLoaderTrue());
            }}
          >
            <Grid
              container
              sx={{
                alignItems: "center",
                cursor: "pointer",
                color: "text.primary",
              }}
            >
              <Grid item sx={{ mx: 1 }}>
                <ExitToAppIcon />
              </Grid>
              <Grid item>Sign out</Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      ) : (
        <>
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
                      theme === "dark" ? "#ffffff22" : "#00000022",
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
                    {dict[i].fixedText}
                  </Grid>
                </Grid>
              </Grid>
              <Box
                sx={{
                  border: "none",
                  height: "1px",
                  backgroundColor: "#3F3F3F",
                  width: "100%",
                  marginY: 1,
                }}
              />
              {dict[i].subtable.map((subValue, subKey) => {
                return (
                  <Grid
                    item
                    key={subKey}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor:
                          theme === "dark" ? "#ffffff22" : "#00000022",
                      },
                      padding: "8px",
                      width: "100%",
                    }}
                    onClick={() => {
                      dict[i].functions(subValue);
                    }}
                  >
                    <Grid container>
                      <Grid item sx={{ mx: 1 }}>
                        {subValue === dict[i].text ? (
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
              })}
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
};

export default NestedMenu;
