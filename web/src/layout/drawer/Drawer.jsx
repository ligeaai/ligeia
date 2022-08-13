import React from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import {
  mouseEnterDrawer,
  mouseLeaveDrawer,
} from "../../services/reducers/drawerReducer";

import DrawerItem from "./DrawerItem";

const Drawer = () => {
  const dispatch = useDispatch();
  return (
    <Grid
      onMouseOver={() => dispatch(mouseEnterDrawer())}
      onMouseOut={() => dispatch(mouseLeaveDrawer())}
      container
      sx={{
        position: "absolute",
        paddingTop: "17px !important",
        backgroundColor: "#FAFBFC",
        width: "min-content",
        minHeight: "calc(100vh - 57px)",
        alignContent: "flex-start",
        overflow: "hidden",
        transition: ".2s",
        zIndex: "1",
      }}
    >
      <DrawerItem />
    </Grid>
  );
};

export default Drawer;
