import React from "react";

import GitHubLogin from "react-login-github";
import { useDispatch } from "react-redux";

import { myGithubLogin } from "../../services/actions/auth";
import { setLoaderTrue } from "../../services/actions/loader";
import history from "../../routers/history";
function GithubSocialAuth(props) {
  const dispatch = useDispatch();
  const { Element } = props;
  return (
    <GitHubLogin
      clientId="18aca4fc69e6c0c27eae"
      onSuccess={(response) => {
        console.log(response);
        dispatch(setLoaderTrue());
        dispatch(myGithubLogin(response.code)).then(() => {
          history.push("/");
        });
      }}
      onFailure={(response) => {
        console.log("ads");
        console.log(response);
      }}
    >
      {Element}
    </GitHubLogin>
  );
}
export default GithubSocialAuth;
