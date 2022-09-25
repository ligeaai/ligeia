import React from "react";

import { Grid } from "@mui/material";

import facebook from "../../assets/Images/socialmedia/facebook.png";
import google from "../../assets/Images/socialmedia/google.png";
import github from "../../assets/Images/socialmedia/github.png";

import SocialButtons from "../../components/buttons/socialButtons";

const social = () => {
  const socialAcount = [
    {
      url: "facebook",
      logo: facebook,
    },
    {
      url: "github",
      logo: github,
    },
    {
      url: "google",
      logo: google,
    },
  ];

  return (
    <Grid container spacing={1} sx={{ justifyContent: "center" }}>
      {socialAcount.map((e, key) => (
        <Grid item key={key}>
          <SocialButtons url={e.url} logo={e.logo} />
        </Grid>
      ))}
    </Grid>
  );
};

export default social;
