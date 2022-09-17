import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import github from "../../assets/Images/socialmedia/github.png";
import instagram from "../../assets/Images/socialmedia/instagram.png";
import logo from "../../assets/Images/socialmedia/logo.png";
import pinterest from "../../assets/Images/socialmedia/pinterest.png";
import twitter from "../../assets/Images/socialmedia/twitter.png";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: "0",
        padding: "0 7% 2% 3.5%",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item>
          <Typography
            sx={{
              lineHeight: 1.875,
              fontSize: "16px",
            }}
          >
            © 2022 Ligeia.ai. All rights Reserved <br />
            Privacy Policy | Legal Stuff
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={4}>
            <Grid item>
              <img src={logo} alt="logo" />
            </Grid>
            <Grid item>
              <img src={twitter} alt="twitter" />
            </Grid>
            <Grid item>
              <img src={instagram} alt="instagram" />
            </Grid>
            <Grid item>
              <img src={pinterest} alt="pinterest" />
            </Grid>
            <Grid item>
              <img src={github} alt="github" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
