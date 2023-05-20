import React from "react";
import { useSelector } from "react-redux";

import { Grid, Avatar, Menu } from "@mui/material";
import "../../../assets/styles/layouts/settingsMenu.scss";
import MainMenu from "./mainMenu";
import Appearance from "./appearance";
import Languages from "./language";
import Location from "./location";
import Layer from "./layer";
import Settings from "./settings";
const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuName, setMenuName] = React.useState("main");
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuName("main");
  };
  const changeMenu = (menuName) => {
    console.log(menuName);
    setMenuName(menuName);
  };

  return (
    <Grid item className="settings-container">
      <Grid
        container
        alignItems="center"
        columnSpacing={1.5}
        onClick={handleMenu}
      >
        <Grid item>
          <Grid
            className="settings-container__name-role"
            container
            rowGap={0.5}
          >
            <Grid item className="settings-container__name-role__name">
              {user?.first_name}
            </Grid>
            <Grid item className="settings-container__name-role__role">
              {user?.role?.ROLES_NAME}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Avatar
            alt={user ? user.first_name.concat(" ", user.last_name) : "Unknown"}
            src="/"
          />
        </Grid>
      </Grid>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{
          paper: "settings-container__main-menu",
        }}
      >
        {menuName === "main" && (
          <MainMenu changeMenu={changeMenu} handleClose={handleClose} />
        )}
        {menuName === "Appearance" && (
          <Appearance changeMenu={changeMenu} handleClose={handleClose} />
        )}
        {menuName === "Language" && (
          <Languages changeMenu={changeMenu} handleClose={handleClose} />
        )}
        {menuName === "Location" && (
          <Location changeMenu={changeMenu} handleClose={handleClose} />
        )}
        {menuName === "Layer" && (
          <Layer changeMenu={changeMenu} handleClose={handleClose} />
        )}
        {menuName === "Settings" && (
          <Settings changeMenu={changeMenu} handleClose={handleClose} />
        )}
      </Menu>
    </Grid>
  );
};

export default Main;
