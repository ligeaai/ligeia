import React from "react";
import { Grid, Link } from "@mui/material";
import history from "../../routers/history";
const header = (props) => {
  const { isSignIn } = props;
  return (
    <Grid
      container
      sx={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          textAlign: "center",
          borderWidth: "0px",
          paddingBottom: "5px",
          borderBottomWidth: "1px",
          borderColor: isSignIn ? "text.primary" : "text.secondary",
          borderStyle: "solid",
        }}
      >
        <Link
          underline="none"
          sx={{
            width: "100%",
            cursor: "pointer",
            color: isSignIn ? "text.primary" : "text.secondary",
            opacity: isSignIn ? "1" : "0.6",
            fontWeight: "700",
          }}
          onClick={() => history.push("/signin")}
        >
          Sign In
        </Link>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          textAlign: "center",
          borderWidth: "0px",
          paddingBottom: "5px",
          borderBottomWidth: "1px",
          borderColor: isSignIn ? "text.secondary" : "text.primary",
          borderStyle: "solid",
          opacity: isSignIn ? "0.6" : "1",
        }}
      >
        <Link
          underline="none"
          sx={{
            width: "100%",
            cursor: "pointer",
            color: isSignIn ? "text.secondary" : "text.primary",
            fontWeight: "700",
          }}
          onClick={() => history.push("/signup")}
        >
          Sign Up
        </Link>
      </Grid>
    </Grid>
  );
};

export default header;
