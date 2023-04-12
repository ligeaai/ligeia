import React from "react";
import { useDispatch } from "react-redux";

import { Avatar, Box, Grid, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { removeRole } from "../../../../../services/actions/roles/link";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  console.log(user);
  const btnDeleteHandle = () => {
    dispatch(removeRole(user.email));
  };
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        border: "1px solid black",
        borderRadius: "8px",
        p: 1,
        position: "relative",
      }}
    >
      <Grid sm={12} md={6}>
        <Avatar sx={{ width: "125px", height: "125px", margin: "auto" }}>
          {user.first_name[0]}
          {user.last_name[0]}
        </Avatar>
      </Grid>
      <Grid sm={12} md={6}>
        <Grid container>
          <Grid item xs={12}>
            {user.first_name}
          </Grid>
          <Grid item xs={12}>
            {user.last_name}
          </Grid>
          <Grid item xs={12}>
            {user.email}
          </Grid>
          <Grid item xs={12}>
            role
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ position: "absolute", top: 4, right: 4 }}>
        <IconButton onClick={btnDeleteHandle}>
          <DeleteForeverIcon fontSize="small" />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default UserCard;
