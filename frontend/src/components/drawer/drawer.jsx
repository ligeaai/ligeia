import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";
// import {
//   mouseEnterDrawer,
//   mouseLeaveDrawer,
// } from "../../services/actions/drawerMenu/drawerMenu";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import App from "./app";
import { ComponentError, ComponentErrorBody } from "../index";
import { loadDrawerMenu } from "../../services/actions/drawerMenu/drawerMenu";
import { LoadingComponent } from "../../components";
const Drawer = (props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawerMenu.isOpen);
  const { navItems } = props;
  React.useEffect(() => {
    dispatch(loadDrawerMenu());
  }, []);
  return (
    <Box
      // onMouseEnter={() => dispatch(mouseEnterDrawer())}
      // onMouseLeave={() => dispatch(mouseLeaveDrawer())}
      sx={{
        minWidth: isOpen ? "248px" : "68px",
        minHeight: "calc(100vh - 60px - 8px)",
        height: "500px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "0.2em",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid rgba(0,0,0,.3)",
        },
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
        mt: 0.5,
        ml: 0.5,
        boxShadow: 3,
        borderRadius: "3px",
      }}
    >
      <ComponentError
        errMsg={
          <ComponentErrorBody
            text="Something went wrong"
            icon={<ErrorOutlineIcon />}
          />
        }
      >
        {navItems ? (
          <App menu={navItems} />
        ) : (
          <LoadingComponent></LoadingComponent>
        )}
      </ComponentError>
    </Box>
  );
};

export default Drawer;
