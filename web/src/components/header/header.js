import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import SearchPanel from "./search-panel";
import ProfileMenu from "./profile-menu";
import TreeMenu from "./tree-menu";

export default function Header({ toggleDark, settoggleDark }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDrawer, setDrawer] = React.useState(true);

  const isProfileMenuOpen = Boolean(anchorEl);
  // const isDrawerMenuOpen = Boolean(openDrawer);

  const handleModeChange = () => {
    settoggleDark(!toggleDark);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawer(!openDrawer);
    console.log("openDrawer: " + openDrawer);
  };

  const menuId = "profile-menu";

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              onClick={toggleDrawer}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <SearchPanel />

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Switch
                checked={toggleDark}
                onChange={handleModeChange}
                name="toggleDark"
                color="default"
              />
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleProfileMenuOpen}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={isProfileMenuOpen ? { menuId } : undefined}
                  aria-haspopup="true"
                  aria-expanded={isProfileMenuOpen ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        <ProfileMenu
          id={menuId}
          anchorEl={anchorEl}
          open={isProfileMenuOpen}
          onClose={handleProfileMenuClose}
        />
        <TreeMenu open={openDrawer} onClose={toggleDrawer} />
      </Box>
    </React.Fragment>
  );
}
