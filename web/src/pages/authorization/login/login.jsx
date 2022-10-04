import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { palette } from "@mui/system";
import history from "../../../routers/history";

import Start from "../../../layout/start/start";
import Layout from "../../../layout/authorization/layout";

import { login } from "../../../services/actions/auth";
import { setLoaderTrue } from "../../../services/actions/loader";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const navigate = (e, route) => {
  e.preventDefault();
  history.push(`${route}`);
};
const MyBody = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(setLoaderTrue());
      dispatch(login(values.email, values.password)).then(() => {
        history.push(`/`);
      });
    },
  });

  const [passVisible, setPassVisible] = useState(false);

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          fullWidth
          name="email"
          label="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        {formik.errors.email && formik.touched.email ? (
          <Box
            sx={{
              color: "#B3261E",
              position: "absolute",
              typography: "subtitle2",
              paddingBottom: "10px",
            }}
          >
            {formik.errors.email}
          </Box>
        ) : null}
        <TextField
          fullWidth
          id="password"
          name="password"
          placeholder="Password"
          label="Password"
          type={passVisible ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          sx={{ mt: 2 }}
          InputProps={{
            endAdornment: (
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
            ),
          }}
        />
        {formik.errors.password && formik.touched.password ? (
          <Box
            sx={{
              color: "#B3261E",
              position: "absolute",
              typography: "subtitle2",
              paddingBottom: "10px",
            }}
          >
            {formik.errors.password}
          </Box>
        ) : null}

        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center", my: 3 }}
        >
          <Grid item>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      "&.Mui-checked": {
                        color: "text.secondary",
                      },
                    }}
                  />
                }
                label="Remember me"
                sx={{
                  color: "text.secondary",
                }}
              />
            </FormGroup>
          </Grid>
          <Grid item>
            <Link
              underline="none"
              onClick={(e) => {
                navigate(e, "forgotPassword");
              }}
              sx={{ fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
            >
              Forgot Password?
            </Link>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "100%",
            textTransform: "capitalize",
            background: "linear-gradient(to bottom right, #3A416F, #141727)",
            color: "#ffffff",
            fontWeight: "700",
            borderRadius: "8px",
            p: 1.5,
          }}
        >
          Sign In
        </Button>
      </form>
    </React.Fragment>
  );
};

const authorizationLayout = () => {
  return <Layout Element={MyBody} isSignInPanel={true} />;
};

const Login = () => {
  return <Start Element={authorizationLayout} />;
};

export default Login;
