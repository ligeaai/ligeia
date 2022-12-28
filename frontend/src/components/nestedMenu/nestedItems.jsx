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
          backgroundColor: "hover.primary",
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
        border: "0.1px solid",
        backgroundColor: "status.secondary",
        borderColor: "status.secondary",
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
        border: "0.2px solid",
        backgroundColor: "status.secondary",
        borderColor: "status.secondary",
        width: "98%",
        margin: "auto",
      }}
    />
  );
};
