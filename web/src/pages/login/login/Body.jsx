import React, { useState } from "react";

import {
  Box,
  Typography,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import langPicker from "../LangPicker";
const Body = () => {
  const [passVisible, setPassVisible] = useState(false);
  const text = langPicker();
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
            width: "360px",
            boxShadow: "0px 4px 20px rgba(194, 194, 194, 0.25)",
            backgroundColor: "#ffffff",
          },
        },
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          typography: { xs: { display: "none" }, sm: { display: "block" } },
          mb: 2.5,
        }}
      >
        {text.body.authorization}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {text.body.username}
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput placeholder={`${text.body.usernameInput}`} />
      </FormControl>
      <Typography variant="h6" sx={{ mb: 1, mt: 2.5 }}>
        {text.body.password}
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          placeholder={`${text.body.passwordInput}`}
          type={passVisible ? "text" : "password"}
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
      </FormControl>
      <Button variant="contained" sx={{ width: "100%", mt: 2.5 }}>
        {text.body.signIn}
      </Button>
    </Box>
  );
};

export default Body;
