import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  mouseEnterDrawer,
  mouseLeaveDrawer,
} from "../../services/reducers/drawerReducer";

import App from "./app";
// const MyBox = styled(Grid)(({ theme }) => {
//   console.log(theme);
// });
const Drawer = (props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const { navItems } = props;

  return (
    <Box
      onMouseEnter={() => dispatch(mouseEnterDrawer())}
      onMouseLeave={() => dispatch(mouseLeaveDrawer())}
      sx={{
        minWidth: "68px",
        minHeight: "calc(100vh - 60px - 8px)",
        height: "500px",
        width: "min-content",
        typography: {
          xs: {
            display: isOpen ? "inline-block" : "none",
          },
          sm: { display: "inline-block" },
        },
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingX: "6px",
        m: 0.5,
        mr: 0,
        boxShadow: 3,
        borderRadius: "3px",
      }}
    >
      <App menu={navItems} />
    </Box>
  );
};

export default Drawer;
