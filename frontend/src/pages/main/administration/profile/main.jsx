import React from "react";
import { Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
} from "../../../../components";
import ProfileEdior from "./profileEditor";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
import "../../../../assets/styles/page/administration/profile/profile.scss";
const Main = () => {
  document.title = "Ligeia.ai | Profile";
  selectDrawerItem("Profile");

  return (
    <Grid container className="profile-container">
      <Breadcrumb />
      <ItemSperatorLineXL />
      <Grid item xs={12} className="profile-container__body">
        <ComponentError errMsg="Error">
          <ProfileEdior />
        </ComponentError>
      </Grid>
    </Grid>
  );
};

export default Main;
