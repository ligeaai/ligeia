import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { myGoogleLogin } from "../../services/api/social";
import { Box } from "@mui/material";
function GoogleSocialAuth(props) {
  const { Element } = props;
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "491001574499-4ppnfldsim578soko2qp1o96seorjhgo.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <GoogleLogin
      clientId="491001574499-4ppnfldsim578soko2qp1o96seorjhgo.apps.googleusercontent.com"
      render={(renderProps) => (
        <Box onClick={renderProps.onClick}>{Element}</Box>
      )}
      onSuccess={(response) => {
        myGoogleLogin(response.accessToken);
      }}
      onFailure={(response) => {
        console.log("google auth fail");
      }}
    />
  );
}

export default GoogleSocialAuth;
