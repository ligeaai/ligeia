import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import StartComponent from "../../layout/start/start";

const Element = () => {
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

const Start = () => {
  return (
    <Box>
      <StartComponent Element={Element} searchBarTheme="dark" />
    </Box>
  );
};

export default Start;
