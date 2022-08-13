import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";

import history from "../../../routers/history";

const navigate = (e, route) => {
  e.preventDefault();
  history.push(`${route}`);
};

const Body = () => {
  const [code, setCode] = useState("");
  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        p: 2.5,
        transform: "translate(-50%,-50%)",
        borderRadius: "10px",
        typography: {
          xs: {
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            boxShadow: "none",
          },
          sm: {
            width: "525px",
            boxShadow: "0px 4px 20px rgba(194, 194, 194, 0.25)",
            backgroundColor: "#ffffff",
          },
        },
      }}
    >
      <Typography variant="h5" sx={{ mb: 2.5 }}>
        Enter security code
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: "300", mb: 3 }}>
        An SMS message with an 8-digit code has been sent to your phone number.
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={6} sx={{ pr: 2.5 }}>
          <OutlinedInput
            type="text"
            name="code"
            value={code}
            onChange={onChangeCode}
            placeholder="Enter Code"
            sx={{ mb: 2.5, backgroundColor: "#ffffff", width: "100%" }}
          ></OutlinedInput>
        </Grid>
        <Grid item sm={6}>
          <Typography>
            We sended code to: <br /> a****@mail.ru
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4} sx={{ pl: 2, pr: 4.5 }}>
          <Link>Didn't receive the code ?</Link>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Button
            variant="contained"
            color="inherit"
            sx={{ padding: "8px 44px" }}
            onClick={(e) => navigate(e, "/")}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Button
            variant="contained"
            sx={{ padding: "8px 54px" }}
            onClick={(e) => navigate(e, "/login/newpassword")}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Body;
