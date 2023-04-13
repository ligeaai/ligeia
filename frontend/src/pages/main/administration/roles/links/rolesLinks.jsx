import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Button, Typography } from "@mui/material";

import { MyDialog } from "../../../../../components";
import { loadRoleLink } from "../../../../../services/actions/roles/link";

import addRolePopUp from "./addRolePopUp";
import UserCard from "./userCard";

const RolesLinks = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.roles.linkedUsers);
  const roleId = useSelector((state) => state.treeview.selectedItem.ROLES_ID);
  React.useEffect(() => {
    dispatch(loadRoleLink());
  }, [roleId]);
  return (
    <Grid container rowGap={2} sx={{ p: 2 }}>
      <Grid item xs={12} sx={{ textAlign: "center", fontSize: "18px" }}>
        Linked Users
      </Grid>
      <Grid item xs={12}>
        <Grid container rowGap={2} columnSpacing={2}>
          {users.map((e, i) => {
            return (
              <Grid item key={i} xs={12} md={6} xl={4}>
                <UserCard user={e} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MyDialog
          Button={
            <Button variant="outlined">
              <Typography sx={{ color: "primary.main" }}>New</Typography>
            </Button>
          }
          DialogBody={addRolePopUp}
        />
      </Grid>
    </Grid>
  );
};

export default RolesLinks;
