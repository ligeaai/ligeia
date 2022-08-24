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

import history from "../../../routers/history";
import langPicker from "../LangPicker";
import styles from "../../../assets/Styles/pages/login/login/body";

import { login } from "../../../services/actions/auth";

const navigate = (e, route) => {
  e.preventDefault();
  history.push(`${route}`);
};

const Body = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [passVisible, setPassVisible] = useState(false);
  const text = langPicker();
  const onChangeFactory = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box sx={styles().box}>
        <Typography variant="h4" textAlign="center" sx={styles().header}>
          {text.body.authorization}
        </Typography>
        <Typography variant="h6" sx={styles().inputLabel}>
          {text.body.username}
        </Typography>
        <FormControl sx={styles().input}>
          <OutlinedInput
            name="email"
            placeholder={`${text.body.usernameInput}`}
            value={user.email}
            onChange={onChangeFactory}
          />
        </FormControl>
        <Typography variant="h6" sx={styles().inputLabel}>
          {text.body.password}
        </Typography>
        <FormControl sx={styles().input}>
          <OutlinedInput
            name="password"
            placeholder={`${text.body.passwordInput}`}
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

        <Button
          variant="contained"
          sx={styles().btnSignIn}
          onClick={async (e) => {
            e.preventDefault();
            (await dispatch(login(user.email, user.password))) ? (
              <></>
            ) : (
              navigate(e, "/")
            );
          }}
        >
          {text.body.signIn}
        </Button>
        <Button
          onClick={(e) => {
            navigate(e, "/login/passrecovery");
          }}
        >
          Wrong pass
        </Button>
        <Button
          onClick={(e) => {
            navigate(e, "/signup");
          }}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
};

export default Body;
