import React from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import {
  BreadcrumbBox,
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
    <MainBox>
      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <BreadcrumbBox />
          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ height: "calc(100% - 48px)", p: 1 }}>
            <UsersEditor />
          </Grid>
        </Grid>
      </Grid>
    </MainBox>
  );
};

export default Main;
