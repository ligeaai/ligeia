import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { ReactReduxContext } from "react-redux";

const NestedMenu = (props) => {
  const { dict } = props;
  const [menu, setMenu] = React.useState(dict.map(() => false));
  const [mainMenu, setMainMenu] = React.useState(true);
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        backgroundColor: "#1F1F1F",
        width: "250px",
        pt: 1,
      }}
    >
      {mainMenu ? (
        <>
          {dict.map((e, key) => {
            return (
              <React.Fragment key={key}>
                <Grid
                  item
                  sx={{
                    padding: "5px",
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
                      menu[key] = !menu[key];
                      setMenu([...menu]);
                      setMainMenu(false);
                    }}
                  >
                    <Grid item>
                      <Grid container>
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
                    <Grid item sx={{ px: 1 }}>
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
                <HelpOutlineIcon />
              </Grid>
              <Grid item>Help</Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {menu.map((key, i) => (
            <Grid
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
                  menu[i] = !menu[i];
                  setMenu(menu);
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
                  <Grid item>{dict[i].fixedText}</Grid>
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
                        backgroundColor: "#3F3F3F",
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
        </>
      )}
    </Grid>
  );
};

export default NestedMenu;
