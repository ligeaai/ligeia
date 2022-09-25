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
        <Grid
          item
          sx={{
            typography: {
              xs: {
                display: `${drawer.width}` === "56px" ? "none" : "block",
              },
              sm: { display: "inline-block" },
            },
          }}
        >
          <Drawer />
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor: "#F0F2F5",
            height: "calc(100vh - 57px)",
            typography: {
              xs: { marginLeft: "0px" },
              sm: {
                marginLeft: `${drawer.width}`,
                width: `calc(100vw - ${drawer.width})`,
              },
            },
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
