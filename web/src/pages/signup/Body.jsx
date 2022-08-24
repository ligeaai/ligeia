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
import styles from "../../assets/Styles/pages/signup/body";
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
    <Box sx={styles().box}>
      <Typography variant="h4" textAlign="center" sx={styles().header}>
        Sign up
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Email
      </Typography>
      <FormControl sx={styles().input}>
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
      <FormControl sx={styles().input}>
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
      <FormControl sx={styles().input}>
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
      <FormControl sx={styles().input}>
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
      <FormControl sx={styles().input}>
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
