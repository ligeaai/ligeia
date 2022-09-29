import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import {
  Button,
  Checkbox,
  Grid,
  FormControlLabel,
  FormGroup,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import history from "../../../routers/history";

import Start from "../../../layout/start/start";
import Layout from "../../../layout/authorization/layout";

import { signup } from "../../../services/actions/auth";
import { setFirstLastName } from "../../../services/reducers/registerFormReducer";
import { setLoaderTrue } from "../../../services/actions/loader";

const MyBody = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.registerForm);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      isAgree: userData.isAgree,
    },

    onSubmit: async (values) => {
      dispatch(
        setFirstLastName({
          firstname: values.firstname,
          lastname: values.lastname,
          isAgree: values.isAgree,
        })
      );
      if (values.isAgree) {
        dispatch(setLoaderTrue());
        dispatch(
          signup(
            userData.email,
            values.firstname,
            values.lastname,
            userData.password
          )
        ).then(() => {
          history.push(`/`);
        });
      } else {
        dispatch({
          type: "ADD_ERROR_SUCCESS",
          payload: "You must accept the Term and Conditions",
        });
      }
    },
  });

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          fullWidth
          name="firstname"
          label="Firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          name="lastname"
          placeholder="Lastname"
          label="Lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          sx={{ mt: 2 }}
        />
        <Grid container sx={{ justifyContent: "center", my: 3 }}>
          <Grid item>
            <FormGroup>
              <FormControlLabel
                name="isAgree"
                control={
                  <Checkbox
                    checked={formik.values.isAgree}
                    sx={{
                      "&.Mui-checked": {
                        color: "text.secondary",
                      },
                    }}
                  />
                }
                onChange={formik.handleChange}
                label={
                  <Typography>
                    I agree the{" "}
                    <Link underline="none" sx={{ fontWeight: "700" }}>
                      Term and Conditions
                    </Link>
                  </Typography>
                }
                sx={{
                  color: "text.secondary",
                }}
              />
            </FormGroup>
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
          Sign Up
        </Button>
      </form>
    </React.Fragment>
  );
};

const authorizationLayout = () => {
  return <Layout Element={MyBody} isSignInPanel={false} />;
};

const RegisterPageTwo = () => {
  return <Start Element={authorizationLayout} />;
};

export default RegisterPageTwo;
