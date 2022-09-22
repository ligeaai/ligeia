import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";

const NestedMenu = (props) => {
  const { dict } = props;
  const [menu, setMenu] = React.useState(dict.map(() => false));
  useState(() => {
    console.log(menu);
  }, [menu]);
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        backgroundColor: "#1F1F1F",
        borderRadius: "8px",
        padding: "8px",
      }}
    >
      {dict.map((e, key) => {
        return (
          <React.Fragment key={key}>
            <Grid
              item
              sx={{
                padding: "3px",
                borderRadius: "8px",
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
                  justifyContent: "space-evenly",
                }}
                onClick={() => {
                  menu[key] = !menu[key];
                  setMenu([...menu]);
                }}
              >
                <Grid item>{e.icon}</Grid>
                <Grid item>
                  {e.fixedText}
                  <Typography
                    sx={{ display: "inline", textTransform: "capitalize" }}
                  >
                    {e.text}
                  </Typography>
                </Grid>
                <Grid item>
                  <KeyboardArrowRightIcon />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: menu[key] ? "flex" : "none",
                flexDirection: "column",
                alignItems: "flex-end",
                paddingRight: "10px",
              }}
            >
              {e.subtable.map((subValue, subKey) => {
                return (
                  <Grid
                    item
                    key={subKey}
                    sx={{
                      cursor: "pointer",
                      p: 0.5,
                    }}
                    onClick={() => {
                      e.functions(subValue);
                    }}
                  >
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {subValue}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </React.Fragment>
        );
      })}
      <Box
        sx={{
          border: "none",
          height: "1px",
          backgroundColor: "#ffffff",
          width: "100%",
          marginY: 1,
        }}
      />
      <Grid
        item
        sx={{
          padding: "3px",
          borderRadius: "8px",
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
          }}
        >
          <Grid item>
            <HelpOutlineIcon />
          </Grid>
          <Grid item>Help</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NestedMenu;
