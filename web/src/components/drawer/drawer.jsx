import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  mouseEnterDrawer,
  mouseLeaveDrawer,
} from "../../services/reducers/drawerReducer";

import DrawerItem from "./drawerItem";

const Drawer = (props) => {
  const dispatch = useDispatch();
  const { navItems } = props;

  const MyBox = styled(Grid)(({ theme }) => ({}));
  return (
    <MyBox
      onMouseEnter={() => dispatch(mouseEnterDrawer())}
      onMouseLeave={() => dispatch(mouseLeaveDrawer())}
      sx={{
        width: "min-content",
        minHeight: `calc(100vh - 75px)`,
        paddingTop: "16px",
        alignContent: "flex-start",
        paddingBottom: "16px",
      }}
    >
      <DrawerItem items={navItems} />
    </MyBox>
  );
};

export default Drawer;
