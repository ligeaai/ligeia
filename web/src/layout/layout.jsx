import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Grid } from "@mui/material";

import Drawer from "./drawer/Drawer";
import Header from "./headers/Header";

const Layout = () => {
  const drawer = useSelector((state) => state.drawer);
  return (
    <>
      <Header />
      <Grid container flexWrap="nowrap">
        <Grid item>
          <Drawer />
        </Grid>
        <Grid
          item
          sx={{
            width: `calc(100vw - ${drawer.width})`,
            marginLeft: `${drawer.width}`,
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
