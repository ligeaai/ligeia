import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import App from "./app";
import { ComponentError, ComponentErrorBody } from "../index";
import {
  loadDrawerMenu,
  setSelectedDrawerItem,
} from "../../services/actions/drawerMenu/drawerMenu";
import { LoadingComponent } from "../../components";
const Drawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawerMenu.isOpen);
  const navItems = useSelector((state) => state.drawerMenu.data);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  React.useEffect(() => {
    dispatch(loadDrawerMenu());
    if (window.location.pathname === "/") {
      dispatch(setSelectedDrawerItem({ SHORT_LABEL: "Home" }));
    }
    console.log();
  }, [isAuth]);
  return (
    <Box
      sx={{
        minWidth: isOpen ? "248px" : "68px",
        minHeight: "calc(100vh - 60px - 8px)",
        height: "500px",
        overflow: "hidden",

        width: "min-content",
        typography: {
          xs: {
            display: isOpen ? "inline-block" : "none",
          },
          sm: { display: "inline-block" },
        },
        mt: 0.5,
        ml: 0.5,
        boxShadow: 3,
        borderRadius: "3px",
        backgroundColor: "success.secondary",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "0.25em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.2)",
          },
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingX: "6px",
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
    </Box>
  );
};

export default Drawer;
