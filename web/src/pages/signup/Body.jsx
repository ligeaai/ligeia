import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import history from "../../routers/history";

import { signup } from "../../services/actions/auth";

const navigate = (e, route) => {
  e.preventDefault();
  history.push(`${route}`);
};

const Body = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    repassword: "",
  });
  const [passVisible, setPassVisible] = useState(false);
  const [repassVisible, setRePassVisible] = useState(false);
  const onChangeFactory = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
        Sign up
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Email
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          name="email"
          placeholder={"Email"}
          value={user.email}
          onChange={onChangeFactory}
        />
      </FormControl>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Name
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          name="name"
          placeholder={"Name"}
          value={user.name}
          onChange={onChangeFactory}
        />
      </FormControl>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Surname
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          name="surname"
          placeholder={"Surname"}
          value={user.surname}
          onChange={onChangeFactory}
        />
      </FormControl>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Password
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          name="password"
          placeholder={`Password`}
          type={passVisible ? "text" : "password"}
          value={user.password}
          onChange={onChangeFactory}
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

      <Typography variant="h6" sx={{ mb: 1 }}>
        Repassword
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          name="repassword"
          placeholder={`Repassword`}
          type={repassVisible ? "text" : "password"}
          value={user.repassword}
          onChange={onChangeFactory}
          endAdornment={
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setRePassVisible(!repassVisible);
              }}
            >
              {repassVisible ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </InputAdornment>
          }
        />
      </FormControl>

      <Button
        variant="contained"
        sx={{ width: "100%", mt: 2.5 }}
        onClick={async (e) => {
          (await dispatch(
            signup(user.email, user.name, user.surname, user.password)
          )) ? (
            <></>
          ) : (
            navigate(e, "/")
          );
        }}
      >
        Sign Up
      </Button>
      <Button
        onClick={(e) => {
          navigate(e, "/login");
        }}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default Body;
