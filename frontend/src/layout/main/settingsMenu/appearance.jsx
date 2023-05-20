import React from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";

import { MenuItem, Box, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import { changeTheme } from "../../../services/actions/theme";

import MenuItems from "./menuItem";
const ChangeTemp = ({ changeMenu, handleClose }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const themeSelect = (theme) => {
    $("#main-box").removeClass().addClass(`theme-${theme}`);
    localStorage.setItem("theme", `theme-${theme}`);
    dispatch(changeTheme(theme));
  };
  return (
    <>
      <MenuItem
        onClick={() => {
          changeMenu("main");
        }}
      >
        <MenuItems Icon={ArrowBackIcon} text="Appearance" />
      </MenuItem>
      <Divider />
      {["dark", "light", "temp", "tempDark", "temp2", "tempDark2"].map((e) => {
        return (
          <MenuItem
            key={e}
            onClick={() => {
              themeSelect(e);
            }}
          >
            <Box className="settings-container__main-menu__item-icon-box">
              {theme === e && <DoneIcon />}
            </Box>
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </MenuItem>
        );
      })}
    </>
  );
};

export default ChangeTemp;
