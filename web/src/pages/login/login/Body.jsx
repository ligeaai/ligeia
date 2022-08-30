import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import {
  Box,
  Button,
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
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      (await dispatch(login(values.email, values.password))) ? (
        <></>
      ) : (
        history.push(`/`)
      );
    },
  });

  const [passVisible, setPassVisible] = useState(false);
  const text = langPicker();
  return (
    <>
      <Box sx={styles().box}>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4" textAlign="center" sx={styles().header}>
            {text.body.authorization}
          </Typography>
          <Typography variant="h6" sx={styles().inputLabel}>
            {text.body.username}
          </Typography>
          <OutlinedInput
            sx={styles().input}
            name="email"
            placeholder={`${text.body.usernameInput}`}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Typography variant="h6" sx={styles().inputLabel}>
            {text.body.password}
          </Typography>
          <OutlinedInput
            sx={styles().input}
            name="password"
            placeholder={`${text.body.passwordInput}`}
            type={passVisible ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
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

          <Button variant="contained" sx={styles().btnSignIn} type="submit">
            {text.body.signIn}
          </Button>
        </form>
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
