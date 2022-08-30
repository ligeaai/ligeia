import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

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
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      password: "",
      repassword: "",
    },
    onSubmit: async (values) => {
      (await dispatch(
        signup(values.email, values.name, values.surname, values.password)
      )) ? (
        <></>
      ) : (
        history.push(`/`)
      );
    },
  });
  const [passVisible, setPassVisible] = useState(false);
  const [repassVisible, setRePassVisible] = useState(false);
  return (
    <Box sx={styles().box}>
      <form onSubmit={formik.handleSubmit}>
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
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </FormControl>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Name
        </Typography>
        <FormControl sx={styles().input}>
          <OutlinedInput
            name="name"
            placeholder={"Name"}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </FormControl>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Surname
        </Typography>
        <FormControl sx={styles().input}>
          <OutlinedInput
            name="surname"
            placeholder={"Surname"}
            value={formik.values.surname}
            onChange={formik.handleChange}
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
        </FormControl>

        <Typography variant="h6" sx={{ mb: 1 }}>
          Repassword
        </Typography>
        <FormControl sx={styles().input}>
          <OutlinedInput
            name="repassword"
            placeholder={`Repassword`}
            type={repassVisible ? "text" : "password"}
            value={formik.values.repassword}
            onChange={formik.handleChange}
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
          type="submit"
        >
          Sign Up
        </Button>
      </form>
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
