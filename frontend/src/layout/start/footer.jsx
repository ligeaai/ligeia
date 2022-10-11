import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../../assets/Images/socialmedia/logo.png";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";

import PrivacyPolicy from "../privacyPolicy";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bottom: "0",
        pt: 3,
        pb: 0,
        px: { xs: 1, lg: 4, xl: 6 },
        height: { xs: "150px", sm: "100px" },
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              textAlign: { xs: "center", sm: "start" },
              lineHeight: 1.875,
              fontSize: { xs: "12px", sm: "14px" },
              color: "#ffffff",
              marginBottom: { xs: "1rem", sm: "0px" },
            }}
          >
            © 2022 Ligeia.ai. All rights Reserved <br />
            <PrivacyPolicy />| Legal Stuff
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            spacing={4}
            sx={{
              alignItems: "center",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            <Grid item>
              <img src={logo} alt="logo" style={{ fill: "#ffffff" }} />
            </Grid>
            <Grid item>
              <TwitterIcon sx={{ color: "#ffffff" }} />
            </Grid>
            <Grid item>
              <InstagramIcon sx={{ color: "#ffffff" }} />
            </Grid>
            <Grid item>
              <PinterestIcon sx={{ color: "#ffffff" }} />
            </Grid>
            <Grid item>
              <GitHubIcon sx={{ color: "#ffffff" }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
