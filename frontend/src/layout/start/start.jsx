import React from "react";
import { Grid, Box } from "@mui/material";

import headBackground from "../../assets/Images/backgorunds/image.jpeg";

import Header from "./header";
import Footer from "./footer";

const Start = (props) => {
  const { children } = props;
  return (
    <Box
      sx={{
        backgroundImage: `url(${headBackground})`,
        backgroundSize: "contain",
        height: "100vh",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            height: { xs: "calc(100vh - 250px)", sm: "calc(100vh - 200px)" },
          }}
        >
          {children}
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Start;
