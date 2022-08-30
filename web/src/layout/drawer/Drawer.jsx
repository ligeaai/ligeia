import React from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import {
  mouseEnterDrawer,
  mouseLeaveDrawer,
} from "../../services/reducers/drawerReducer";

import DrawerItem from "./DrawerItem";
import styles from "../../assets/Styles/layout/drawer/drawer";

const useStyles = makeStyles(styles);

const Drawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Grid
      onMouseEnter={() => dispatch(mouseEnterDrawer())}
      onMouseLeave={() => dispatch(mouseLeaveDrawer())}
      container
      className={classes.box}
    >
      <DrawerItem />
    </Grid>
  );
};

export default Drawer;
