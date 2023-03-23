import React from "react";
import { Grid, Typography } from "@mui/material";

const Start = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: {
          xs: "calc(100vh - 250px)",
          sm: "calc(100vh - 200px)",
        },
        minHeight: "100px",
      }}
    >
      <Grid item>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { xs: "32px", md: "48px", xl: "63px" },
            fontWeight: "800",
            color: "#ffffff",
          }}
        >
          Advancing AI for your needs
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Start;
