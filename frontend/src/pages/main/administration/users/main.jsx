import React from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
} from "../../../../components";
import UsersEditor from "./usersEditor";

import {
  loadUsers,
  cleanUsers,
} from "../../../../services/actions/users/users";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
import "../../../../assets/styles/page/administration/users/users.scss";
import "../../../../assets/styles/layouts/template.scss";
const Main = () => {
  document.title = "Ligeia.ai | Users";
  selectDrawerItem("Users");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUsers());
    return () => {
      dispatch(cleanUsers());
    };
  }, []);

  return (
    <Grid container className="template-container__body users-container">
      <Breadcrumb />
      <ItemSperatorLineXL />
      <Grid item xs={12} className="users-container__body">
        <ComponentError errMsg="Error">
          <UsersEditor />
        </ComponentError>
      </Grid>
    </Grid>
  );
};

export default Main;
