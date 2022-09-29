import React from "react";

// import GitHubLogin from "react-github-login";

import { myGithubLogin } from "../../services/api/social";

function GithubSocialAuth(props) {
  const { Element } = props;
  return (
    <></>
    // <GitHubLogin
    //   clientId=""
    //   onSuccess={(response) => {
    //     myGithubLogin(response);
    //   }}
    //   onFailure={(response) => {
    //     console.log("github auth fail");
    //   }}
    // >
    //   {Element}
    // </GitHubLogin>
  );
}
export default GithubSocialAuth;
