import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import history from "../../../routers/history";

const navigate = (e, route) => {
  e.preventDefault();
  history.push(`${route}`);
};

const Body = () => {
  const [passVisible, setPassVisible] = useState(false);
  const [password, setPassword] = useState([
    {
      password: "",
    },
  ]);
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
      <Typography sx={{ mb: 2, fontWeight: "500" }}>
        Enter a new password
      </Typography>
      <Typography>
        Create a new password that is at least 6 characters long. A strong
        password is a combination of letters, numbers, and punctuation.
      </Typography>
      <OutlinedInput
        placeholder={"Enter password"}
        type={passVisible ? "text" : "password"}
        value={password[0].password}
        sx={{ width: "100%", mb: 2.5, mt: 2 }}
        onChange={(e) => {
          password[0].password = e.target.value;
          setPassword([...password]);
        }}
        endAdornment={
          <InputAdornment
            position="end"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setPassVisible(!passVisible);
            }}
          >
            {passVisible ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </InputAdornment>
        }
      />
      <Grid
        container
        spacing={2}
        flexDirection="row-reverse"
        sx={{
          typography: {
            xs: { justifyContent: "space-between" },
            sm: { justifyContent: "normal" },
          },
        }}
      >
        <Grid item>
          <Button
            variant="contained"
            sx={{ padding: "8px 54px" }}
            onClick={(e) => {
              navigate(e, "/");
            }}
          >
            Next
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="inherit"
            sx={{ padding: "8px 44px" }}
            onClick={(e) => {
              navigate(e, "/");
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Body;
