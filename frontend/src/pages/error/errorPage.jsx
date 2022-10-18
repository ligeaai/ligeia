import React from "react";

import { grey } from "@mui/material/colors";
import { Grid, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const errorPage = () => {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: grey[200],
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          boxShadow: 3,
          backgroundColor: "#ffffff",
          borderRadius: "3px",
          py: 1,
          pt: 0,
        }}
      >
        <Grid container>
          <Grid item xs={12} sx={{ textAlign: "center", boxShadow: 1, py: 1 }}>
            <ErrorOutlineIcon fontSize="large" />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", my: 1 }}>
            <Typography variant="h4">BOOM!</Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", my: 1 }}>
            <Typography variant="h5">
              something has gone terribly wrong
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", my: 1 }}>
            <Typography variant="h6">
              (but we already sent droids to fix it)
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default errorPage;
