import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MenuItem, Box, Divider } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import MenuItems from "./menuItem";

const Location = ({ changeMenu, handleClose }) => {
  return (
    <>
      <MenuItem
        onClick={() => {
          changeMenu("main");
        }}
      >
        <MenuItems Icon={ArrowBackIcon} text="Location" />
      </MenuItem>
      <Divider />
      {["Canada", "Kazakistan", "Türkiye"].map((e) => {
        return (
          <MenuItem key={e}>
            <Box className="settings-container__main-menu__item-icon-box">
              {"Canada" === e && <DoneIcon />}
            </Box>
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </MenuItem>
        );
      })}
    </>
  );
};

export default Location;
