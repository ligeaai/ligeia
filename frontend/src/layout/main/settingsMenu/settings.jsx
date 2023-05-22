import React from "react";
import $ from "jquery";

import { Box, MenuItem, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";

import MenuItems from "./menuItem";

const list = {
  Small: "12px",
  Medium: "14px",
  Large: "18px",
};

const Settings = ({ changeMenu, handleClose }) => {
  const [activeFontSize, setActiveFontSize] = React.useState(
    localStorage.getItem("fontsize")
      ? localStorage.getItem("fontsize")
      : "Small"
  );
  const fontSizeSelect = (e) => {
    $("html").css({
      "font-size": list[e],
    });
    localStorage.setItem("fontsize", `${e}`);
    setActiveFontSize(e);
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          changeMenu("main");
        }}
      >
        <MenuItems Icon={ArrowBackIcon} text="Settings" />
      </MenuItem>
      <Divider />

      <MenuItem
        disableTouchRipple
        sx={{ "&:hover": { backgroundColor: "transparent" } }}
      >
        Font Sizes
      </MenuItem>
      {["Small", "Medium", "Large"].map((e) => {
        return (
          <MenuItem
            key={e}
            onClick={() => {
              fontSizeSelect(e);
            }}
          >
            <Box className="settings-container__main-menu__item-icon-box">
              {activeFontSize === e && <DoneIcon />}
            </Box>
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </MenuItem>
        );
      })}
    </>
  );
};

export default Settings;
