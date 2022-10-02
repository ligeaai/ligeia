import React from "react";
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

  // const MyBox = styled(Grid)(({ theme }) => {
  //   console.log(theme);
  // });
  return (
    <Grid
      onMouseEnter={() => dispatch(mouseEnterDrawer())}
      onMouseLeave={() => dispatch(mouseLeaveDrawer())}
      sx={{
        width: "min-content",
        minHeight: `calc(100vh - 75px)`,
        paddingTop: "16px",
        alignContent: "flex-start",
        paddingBottom: "16px",
        boxShadow: "inset -7px 8px 7px -9px",
      }}
    >
      <DrawerItem items={navItems} />
    </Grid>
  );
};

export default Drawer;
