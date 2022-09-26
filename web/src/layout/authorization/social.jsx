import React from "react";

import { Grid } from "@mui/material";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import SocialButtons from "../../components/buttons/socialButtons";

const social = () => {
  const socialAcount = [
    {
      url: "facebook",
      logo: FacebookRoundedIcon,
    },
    {
      url: "google",
      logo: GoogleIcon,
    },
    {
      url: "github",
      logo: GitHubIcon,
    },
  ];

  return (
    <Grid container spacing={1} sx={{ justifyContent: "center" }}>
      {socialAcount.map((e, key) => (
        <Grid item key={key}>
          <SocialButtons url={e.url} Logo={e.logo} />
        </Grid>
      ))}
    </Grid>
  );
};

export default social;
