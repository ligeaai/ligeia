import React from "react";

import { MyDialog } from "../../../../components";

import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UpdateUserInfo from "./updateUserInfo";
const profileForm = ({ user }) => {
  return (
    <Box className="profile-container__body__form">
      <Box className="profile-container__body__form__update-icon">
        <MyDialog
          Button={
            <IconButton>
              <EditIcon />
            </IconButton>
          }
          DialogBody={UpdateUserInfo}
          user={user}
          defaultWH={[350, 350]}
        />
      </Box>
      <Box className="profile-container__body__form__header">
        User Information
      </Box>
      <Box className="profile-container__body__form__item">
        Ad : {user?.first_name}
      </Box>
      <Box className="profile-container__body__form__item">
        Soyad : {user?.last_name}
      </Box>
      <Box className="profile-container__body__form__item">
        Email : {user?.email}
      </Box>
      <Box className="profile-container__body__form__item">
        Role : {user?.role?.ROLES_NAME}
      </Box>
    </Box>
  );
};

export default profileForm;
