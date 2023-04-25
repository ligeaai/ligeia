import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, InputAdornment, TextField } from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useFormik } from "formik";
import * as yup from "yup";
import "../../../../assets/styles/page/administration/profile/userInfoUpdate.scss";

import { DialogHeaderHelper, FooterHelper } from "../../../../components";
import { changePassword } from "../../../../services/actions/profile/profile";
const validationSchema = yup.object({
  old_password: yup.string().required("Old password is required"),
  new_password: yup
    .string("Enter your password")
    .required("Password is required")
    .min(8, "Must Contain 8 Characters")
    .matches(/^(?=.*[a-z])/, `Must contain one lowercase letter`)
    .matches(/^(?=.*[A-Z])/, `Must contain one upercase letter`)
    .matches(/^(?=.*[0-9])/, `Must contain one number`)
    .matches(
      /^(?=.*[!@.;'^+%&/()=?>£#$½{[}])/,
      `Must contain one special case character`
    ),
  new_password_confirmation: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Passwords must match")
    .required("Confirm new password is required"),
});

const Pass = ({ formik, value }) => {
  const [passVisible, setPassVisible] = useState(false);
  let placeholder = value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        id={value}
        name={value}
        placeholder={placeholder}
        label={placeholder}
        type={passVisible ? "text" : "password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched[value] && Boolean(formik.errors[value])}
        sx={{ mb: 2 }}
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
      {formik.errors[value] && formik.touched[value] ? (
        <Box
          sx={{
            color: "#B3261E",
            position: "absolute",
            typography: "subtitle2",
            paddingBottom: "10px",
            width: "400px",
            bottom: "-14px",
          }}
        >
          {formik.errors[value]}
        </Box>
      ) : null}
    </Box>
  );
};

const ChangePass = ({ handleClose }) => {
  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("dasdsd");
      changePassword(values);
      handleClose();
    },
  });
  return (
    <Box className="profile-update-info">
      <Box>
        <DialogHeaderHelper text="Change Password" />
      </Box>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Box className="profile-update-info__body">
          {Object.keys(formik.initialValues).map((e, i) => {
            return <Pass value={e} key={i} formik={formik} />;
          })}
        </Box>
        <Box>
          <FooterHelper handleClose={handleClose} />
        </Box>
      </form>
    </Box>
  );
};

export default ChangePass;
