import React from "react";
import { useDispatch } from "react-redux";

import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  mouseEnterDrawer,
  mouseLeaveDrawer,
} from "../../services/reducers/drawerReducer";

import DrawerItem from "./drawerItem";

const MyBox = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  backgroundColor: theme.palette.mode === "dark" ? "black" : "#FAFCFF",
  width: "min-content",
  minHeight: "calc(100vh - 75px)",
  height: "auto",
  alignContent: "flex-start",
  overflow: "hidden",
  zIndex: 2,
  paddingTop: "16px",
  boxShadow: "inset 0 8px 6px -6px rgba(0, 0, 0, 0.1)",
}));

const Drawer = (props) => {
  const dispatch = useDispatch();
  const { items } = props;
  return (
    <MyBox
      onMouseEnter={() => dispatch(mouseEnterDrawer())}
      onMouseLeave={() => dispatch(mouseLeaveDrawer())}
    >
      <DrawerItem items={items} />
    </MyBox>
  );
};

export default Drawer;
