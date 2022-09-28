import React from "react";
import GitHubLogin from "react-github-login";
import { myGithubLogin } from "../../services/api/social";
import { Box } from "@mui/material";

function GithubSocialAuth(props) {
  const { Element } = props;
  return (
    <GitHubLogin
      style={{ border: "4px" }}
      clientId=""
      onSuccess={(response) => {
        console.log(response);
        //myGithubLogin(response);
      }}
      onFailure={(response) => {
        console.log("github auth fail");
      }}
    >
      {Element}
    </GitHubLogin>
  );
}
export default GithubSocialAuth;
