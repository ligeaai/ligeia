import React from "react";
import { useDispatch } from "react-redux";
import { Box, TextField } from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";

import { FooterHelper, DialogHeaderHelper } from "../../../../components";
import { addNewUser } from "../../../../services/actions/users/users";
import "../../../../assets/styles/page/administration/profile/userInfoUpdate.scss";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

const AddNewUser = ({ handleClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addNewUser(values));
      handleClose();
    },
  });
  return (
    <Box className="profile-update-info">
      <Box>
        <DialogHeaderHelper text="Add New Staff" />
      </Box>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Box className="profile-update-info__body">
          <TextField
            fullWidth
            name="first_name"
            label="Firstname"
            value={formik.values.first_name}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            name="last_name"
            placeholder="Lastname"
            label="Lastname"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            name="email"
            placeholder="Email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            sx={{ mt: 2 }}
          />
          {formik.errors.email && formik.touched.email ? (
            <Box
              sx={{
                color: "#B3261E",
                position: "absolute",
                typography: "subtitle2",
                paddingBottom: "10px",
                zIndex: 2,
              }}
            >
              {formik.errors.email}
            </Box>
          ) : null}
        </Box>

        <Box>
          <FooterHelper handleClose={handleClose} />
        </Box>
      </form>
    </Box>
  );
};

export default AddNewUser;
