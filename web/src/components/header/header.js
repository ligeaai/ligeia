import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Tooltip,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useTheme } from "@mui/material/styles";

import SearchPanel from "./search-panel";
import ProfileMenu from "./profile-menu";
import TreeMenu from "./tree-menu";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDrawer, setDrawer] = React.useState(false);

  const isProfileMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawer(!openDrawer);
  };

  const menuId = "profile-menu";

  const theme = useTheme();

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
      </Box>
      <ProfileMenu
        id={menuId}
        anchorEl={anchorEl}
        open={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
      />
      <TreeMenu open={openDrawer} onClose={toggleDrawer} />
    </React.Fragment>
  );
};

export default Header;
