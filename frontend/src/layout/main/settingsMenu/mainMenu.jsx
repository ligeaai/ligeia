import React from "react";
import { MenuItem, Divider } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TranslateIcon from "@mui/icons-material/Translate";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";
import LanguageIcon from "@mui/icons-material/Language";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../routers/history";

import MenuItems from "./menuItem";
import NestedMenuItem from "./nestedMenuItem";
import { logout } from "../../../services/actions/auth";
import { setLoaderTrue } from "../../../services/actions/loader";
const MainMenu = ({ changeMenu, handleClose }) => {
  const dispatch = useDispatch();
  const appearance = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);
  const language = useSelector((state) => state.lang.lang);
  const location = "Canada";
  const layer = useSelector((state) => state.auth.user?.active_layer);
  return (
    <>
      <MenuItem
        onClick={() => {
          history.push("/administration/profile");
          handleClose();
        }}
      >
        <MenuItems
          Icon={AccountCircleIcon}
          text={user?.first_name + " " + user?.last_name}
        />
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          changeMenu("Appearance");
        }}
      >
        <NestedMenuItem
          Icon={Brightness2OutlinedIcon}
          text={`Appearance : ${appearance} `}
        />
      </MenuItem>
      <MenuItem
        onClick={() => {
          changeMenu("Language");
        }}
      >
        <NestedMenuItem Icon={TranslateIcon} text={`Language : ${language} `} />
      </MenuItem>
      <MenuItem
        onClick={() => {
          changeMenu("Location");
        }}
      >
        <NestedMenuItem Icon={LanguageIcon} text={`Location : ${location} `} />
      </MenuItem>
      <MenuItem
        onClick={() => {
          changeMenu("Layer");
        }}
      >
        <NestedMenuItem Icon={LanguageIcon} text={`Layer : ${layer} `} />
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          changeMenu("Settings");
        }}
      >
        <NestedMenuItem Icon={SettingsOutlinedIcon} text={`Settings`} />
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          handleClose();
        }}
      >
        <MenuItems Icon={HelpOutlineIcon} text={"Help"} />
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
        }}
      >
        <MenuItems Icon={FeedbackOutlinedIcon} text={"Send feedback"} />
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          dispatch(logout());
          dispatch(setLoaderTrue());
          handleClose();
        }}
      >
        <MenuItems Icon={ExitToAppIcon} text={"Sign Out"} />
      </MenuItem>
    </>
  );
};

export default MainMenu;
