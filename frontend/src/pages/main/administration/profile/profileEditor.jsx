import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemSperatorLineXL, MyDialog } from "../../../../components";
import { Avatar, Grid, Box, Button } from "@mui/material";
import ProfileForm from "./profileForm";
import ChangePass from "./changePass";
import {
  loadProfile,
  cleanProfile,
} from "../../../../services/actions/profile/profile";
const ProfileEditor = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.profile);
  React.useEffect(() => {
    dispatch(loadProfile());
    return () => {
      dispatch(cleanProfile());
    };
  }, []);
  return (
    <>
      <Grid container className="profile-container__body__header">
        <Grid item>
          <Grid container>
            <Grid item>
              <Avatar
                alt={
                  user ? user?.first_name.concat(" ", user?.last_name) : "name"
                }
                src="/"
                className="profile-container__body__header__avatar"
              />
            </Grid>
            <Grid
              item
              className="profile-container__body__header__user-info-box"
            >
              <Box className="profile-container__body__header__user-info-box__user-name">
                {user?.first_name} {user?.last_name}
              </Box>
              <Box className="profile-container__body__header__user-info-box__user-email">
                {user?.email}
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <MyDialog
            Button={
              <Button
                variant="outlined"
                className="profile-container__body__header__btn"
              >
                Change Password
              </Button>
            }
            DialogBody={ChangePass}
            defaultWH={[350, 370]}
          />
        </Grid>
      </Grid>
      <ItemSperatorLineXL />
      <ProfileForm user={user} />
    </>
  );
};

export default ProfileEditor;
