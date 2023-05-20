import React from "react";
import { useSelector } from "react-redux";

import { Box, MenuItem, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";

import MenuItems from "./menuItem";
import Auth from "../../../services/api/auth";
const Layer = ({ changeMenu, handleClose }) => {
  const enableLayers = useSelector((state) => state.auth?.user?.layer_name);
  const activeLayer = useSelector((state) => state.auth?.user?.active_layer);
  const layerSelect = async (LAYER_NAME) => {
    try {
      const body = JSON.stringify({ LAYER_NAME });
      console.log(body);
      try {
        await Auth.activeLayerUpdate(body);
      } catch (err) {
        console.log(err);
      }
      window.location.reload();
    } catch {}
  };
  return (
    <>
      <MenuItem
        onClick={() => {
          changeMenu("main");
        }}
      >
        <MenuItems Icon={ArrowBackIcon} text="Layer" />
      </MenuItem>
      <Divider />
      {enableLayers?.map((e) => {
        return (
          <MenuItem
            key={e}
            onClick={() => {
              layerSelect(e);
            }}
          >
            <Box className="settings-container__main-menu__item-icon-box">
              {activeLayer === e && <DoneIcon />}
            </Box>
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </MenuItem>
        );
      })}
    </>
  );
};

export default Layer;
