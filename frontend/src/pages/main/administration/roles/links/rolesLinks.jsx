import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Button, Typography } from "@mui/material";

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
    <>
      <Box className="roles-container__body__property-box__links__header">
        Linked Users
      </Box>
      <Box>
        <Grid container rowGap={2} columnSpacing={2}>
          {users.map((e, i) => {
            return (
              <Grid item key={i} xs={12} md={6} xl={4}>
                <UserCard user={e} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box>
        <MyDialog
          Button={
            <Button variant="outlined">
              <Typography>New</Typography>
            </Button>
          }
          DialogBody={addRolePopUp}
        />
      </Box>
    </>
  );
};

export default RolesLinks;
