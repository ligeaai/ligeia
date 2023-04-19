import React from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  MainBox,
} from "../../../../components";
import UsersEditor from "./usersEditor";

import {
  loadUsers,
  cleanUsers,
} from "../../../../services/actions/users/users";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
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
    <Grid container className="users-container">
      <Breadcrumb />
      <ItemSperatorLineXL />
      <Grid item xs={12} className="users-container__body">
        <UsersEditor />
      </Grid>
    </Grid>
  );
};

export default Main;
