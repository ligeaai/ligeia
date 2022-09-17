import React from "react";
import { Grid, Box, Typography } from "@mui/material";

import headBackground from "../../assets/backgorunds/image.png";
import background from "../../assets/backgorunds/back.png";

import Header from "../../layout/start/header";
import Footer from "../../layout/start/Footer";

const Start = () => {
  return (
    <Box>
      <Box>
        <img
          src={headBackground}
          alt="bg"
          style={{
            margin: "1%",
            width: "98%",
            height: "550px",
            position: "absolute",
            zIndex: "-5",
          }}
        />
        <Header />
        <Grid
          container
          sx={{
            height: "483px",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "48px",
              fontWeight: "800",
              color: "#ffffff",
            }}
          >
            Advancing AI for everyone
          </Typography>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default Start;
