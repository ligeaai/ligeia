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

export default function Header({ toggleDark, settoggleDark }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleModeChange = () => {
    settoggleDark(!toggleDark);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "profile-menu";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
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
                aria-controls={isMenuOpen ? { menuId } : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
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
        open={isMenuOpen}
        onClose={handleProfileMenuClose}
      />
    </Box>
  );
}
