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
  const { items } = props;
  const [drawerHeight, setDrawerHeight] = useState(0);
  React.useEffect(() => {
    function handleResize() {
      setDrawerHeight(document.body.scrollHeight);
    }
    window.addEventListener("resize", handleResize);
  });
  const MyBox = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    backgroundColor: theme.palette.myBackgorundColor,
    width: "min-content",
    minHeight: `calc(100vh - 75px)`,
    height: `calc(${drawerHeight}px - 75px)`,
    alignContent: "flex-start",
    overflow: "hidden",
    zIndex: 2,
    paddingBottom: "16px",
  }));
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
