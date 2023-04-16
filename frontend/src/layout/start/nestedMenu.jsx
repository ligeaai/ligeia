import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect } from "react";

const NestedMenu = (props) => {
  const { menuItems, isOpen } = props;
  const [menu, setMenu] = React.useState(menuItems.map(() => false));
  var menuValidator = menuItems.map(() => false);
  const [mainMenu, setMainMenu] = React.useState(true);
  useEffect(() => {
    if (isOpen) {
      setMenu(menuItems.map(() => false));
      setMainMenu(true);
    }
  }, [isOpen]);
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        backgroundColor: "#1F1F1F",
        width: "230px",
        pt: 1,
        borderRadius: "5px",
      }}
    >
      {mainMenu ? (
        <React.Fragment>
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
                      backgroundColor: "#3F3F3F",
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
                      <Grid container sx={{ alignItems: "center" }}>
                        <Grid
                          item
                          sx={{ px: 1, typography: "h6", height: "24px" }}
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
                    <Grid item sx={{ px: 1, height: "24px" }}>
                      <KeyboardArrowRightIcon sx={{ typography: "h6" }} />
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
                backgroundColor: "#3F3F3F",
              },
              marginBottom: "8px",
            }}
          >
            <Grid
              container
              sx={{
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Grid item sx={{ mx: 1 }}>
                <HelpOutlineIcon sx={{ typography: "h6" }} />
              </Grid>
              <Grid item>
                <Typography variant="body2">Help</Typography>
              </Grid>
            </Grid>
          </Grid>
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
                    backgroundColor: "#3F3F3F",
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
                  <Grid item sx={{ mx: 1 }}>
                    <ArrowBackIcon />
                  </Grid>
                  <Grid item>{menuItems[i].fixedText}</Grid>
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
              {menuItems[i].subtable.map((subValue, subKey) => {
                return (
                  <Grid
                    item
                    key={subKey}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#3F3F3F",
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
                          <DoneIcon />
                        ) : (
                          <DoneIcon sx={{ visibility: "hidden" }} />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography
                          sx={{ textTransform: "capitalize", color: "#ffffff" }}
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
        </React.Fragment>
      )}
    </Grid>
  );
};

export default NestedMenu;
