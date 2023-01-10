import React from "react";

import { grey } from "@mui/material/colors";
import { Grid, Typography, Link } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import history from "../../routers/history";
const notFound = () => {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.main",
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          boxShadow: 3,
          color: "text.primary",
          backgroundColor: "background.success",
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
            <Typography variant="h4">404!</Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", my: 1 }}>
            <Typography variant="h5">Page not found</Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", my: 1 }}>
            <Typography variant="h6">
              (Would you like to return{" "}
              <Link
                underline="none"
                onClick={() => {
                  history.push("/home");
                }}
                sx={{ cursor: "pointer", color: "icon.success" }}
              >
                home
              </Link>
              ?)
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default notFound;
