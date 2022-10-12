import React from "react";

import { Box, Grid, Typography } from "@mui/material";

export const Items = (props) => {
  const { Icon, text, myFunction } = props;
  return (
    <Grid
      className="settingsMenu"
      item
      sx={{
        padding: "5px",
        "&:hover": {
          backgroundColor: "#bdbdbd33",
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
        onClick={myFunction}
      >
        <Grid item>
          <Grid container sx={{ alignItems: "center", color: "text.primary" }}>
            <Grid item sx={{ px: 1 }}>
              <Icon sx={{ typography: "h6" }} />
            </Grid>
            <Grid item>
              <Typography variant="body2">{text}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const ItemSperatorLine = () => {
  return (
    <Box
      sx={{
        border: "none",
        height: "1px",
        backgroundColor: "#616161",
        width: "100%",
        my: 1,
      }}
    />
  );
};

export const ItemSperatorLineXL = () => {
  return (
    <Box
      sx={{
        border: "none",
        height: "1px",
        backgroundColor: "#4B4B4B",
        width: "98%",
        margin: "auto",
      }}
    />
  );
};
