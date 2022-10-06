import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  mouseEnterDrawer,
  mouseLeaveDrawer,
} from "../../services/reducers/drawerReducer";

import App from "./app";

const Drawer = (props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const { navItems } = props;
  return (
    <Box
      onMouseEnter={() => dispatch(mouseEnterDrawer())}
      onMouseLeave={() => dispatch(mouseLeaveDrawer())}
      sx={{
        minWidth: "88px",
        minHeight: "calc(100vh - 75px)",
        height: "500px",
        width: "min-content",
        typography: {
          xs: {
            display: isOpen ? "inline-block" : "none",
          },
          sm: { display: "inline-block" },
        },
        paddingTop: "16px",
        paddingBottom: "16px",
        paddingX: "16px",
        boxShadow: "inset -7px 8px 7px -9px",
      }}
    >
      <App menu={navItems} />
    </Box>
  );
};

export default Drawer;
