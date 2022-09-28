import React from "react";
import axios from "axios";
import { Grid } from "@mui/material";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import SocialButtons from "../../components/buttons/socialButtons";
import FacebookSocialAuth from "./faceSocialAuth";
import GoogleSocialAuth from "./googleSocialAuth";
import GitHubSocialAuth from "./githubSocialAuth";

const social = () => {
  return (
    <Grid container spacing={1} sx={{ justifyContent: "center" }}>
      <Grid item>
        <FacebookSocialAuth
          Element={<SocialButtons Logo={FacebookRoundedIcon} />}
        />
      </Grid>
      <Grid item>
        <GoogleSocialAuth Element={<SocialButtons Logo={GoogleIcon} />} />
      </Grid>
      <Grid
        item
        sx={{
          button: {
            backgroundColor: "inherit",
            border: "none",
          },
        }}
      >
        <GitHubSocialAuth Element={<SocialButtons Logo={GitHubIcon} />} />
      </Grid>
    </Grid>
  );
};

export default social;
