import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import {
  Box,
  Grid,
  Button,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import history from "../../../routers/history";

import Start from "../../../layout/start/Start";
import Layout from "../../../layout/authorization/layout";

import { login } from "../../../services/actions/auth";

const navigate = (e, route) => {
  e.preventDefault();
  history.push(`${route}`);
};

const MyBody = () => {
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

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <OutlinedInput
          name="email"
          placeholder={"email"}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <Typography variant="h6">password</Typography>
        <OutlinedInput
          name="password"
          placeholder={"password"}
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

        <Button variant="contained" type="submit">
          signIn
        </Button>
      </form>
    </>
  );
};

const authorizationLayout = () => {
  return <Layout Element={MyBody} isSignIn={false} />;
};

const Register = () => {
  return <Start Element={authorizationLayout} />;
};

export default Register;
