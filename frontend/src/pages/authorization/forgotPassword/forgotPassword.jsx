import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Grid, TextField } from "@mui/material";

import Start from "../../../layout/start/start";

import { forget_password } from "../../../services/actions/auth";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(forget_password(values.email));
    },
  });

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "349px",
      }}
    >
      <Grid
        item
        sx={{
          backgroundColor: "myBackgroundColor",
          p: 3,
          pb: 6.5,
          boxShadow: "0px 20px 27px rgba(0, 0, 0, 0.05)",
          borderRadius: "12px",
          width: "410px",
        }}
      >
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
              mt: 2,
            }}
          >
            Send Mail
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
