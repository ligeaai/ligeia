import React from "react";
import { Grid, Box } from "@mui/material";

import headBackground from "../../assets/Images/backgorunds/image.jpeg";

import Header from "./header";
import Footer from "./footer";

const Start = (props) => {
  const { Element } = props;
  return (
    <Box
      sx={{
        backgroundImage: `url(${headBackground})`,
        backgroundSize: "contain",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Element />
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Start;
