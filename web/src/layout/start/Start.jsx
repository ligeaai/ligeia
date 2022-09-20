import React from "react";
import { Grid, Box, Typography } from "@mui/material";

import headBackground from "../../assets/backgorunds/image.jpeg";

import Header from "./header";
import Footer from "./Footer";

const Start = () => {
  return (
    <Box>
      <img
        src={headBackground}
        alt="bg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "-5",
          top: "0",
        }}
      />
      <Box>
        <Header />
        <Footer />
      </Box>
    </Box>
  );
};

export default Start;
