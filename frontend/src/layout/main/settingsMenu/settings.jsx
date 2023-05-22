import React from "react";
import $ from "jquery";

import { Box, MenuItem, Divider, Slider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";

import MenuItems from "./menuItem";

const Settings = ({ changeMenu, handleClose }) => {
  const [activeFontSize, setActiveFontSize] = React.useState(
    localStorage.getItem("fontsize") ? localStorage.getItem("fontsize") : 10
  );
  const fontSizeSelect = (e) => {
    $("html").css({
      "font-size": `${e}px`,
    });
    localStorage.setItem("fontsize", `${e}`);
    setActiveFontSize(e);
  };

  const marks = [
    {
      value: 8,
      label: "8px",
    },
    {
      value: 10,
      label: "10px",
    },

    {
      value: 12,
      label: "12px",
    },
    {
      value: 14,
      label: "14px",
    },
    {
      value: 16,
      label: "16px",
    },
    {
      value: 18,
      label: "18px",
    },
  ];

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
      <MenuItem
        disableTouchRipple
        sx={{ "&:hover": { backgroundColor: "transparent" } }}
      >
        <Slider
          aria-label="Custom marks"
          defaultValue={activeFontSize}
          getAriaValueText={fontSizeSelect}
          step={1}
          min={8}
          max={18}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </MenuItem>
    </>
  );
};

export default Settings;
