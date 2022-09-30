import React from "react";

import { Box } from "@mui/material";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { myFacebookLogin } from "../../services/api/social";

function FacebookSocialAuth(props) {
  const { Element } = props;

  return (
    <FacebookLogin
      render={(renderProps) => (
        <Box onClick={renderProps.onClick}>{Element}</Box>
      )}
      appId="1531824097251400"
      fields="
            id,
            first_name,
            last_name,
            name,
            name_format,
            picture,
            short_name"
      callback={(response) => {
        myFacebookLogin();
      }}
    />
  );
}

export default FacebookSocialAuth;
