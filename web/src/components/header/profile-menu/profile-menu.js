import * as React from "react";
import { Avatar, Divider, MenuItem, Menu, ListItemIcon } from "@mui/material";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import TranslateIcon from "@mui/icons-material/Translate";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";

import { useTheme } from "@mui/material/styles";

import ColorModeContext from "../../context";

const ProfileMenu = ({ id, anchorEl, open, onClose }) => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        id={id}
        open={open}
        onClose={onClose}
        onClick={onClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Purchases and memberships
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <Divider />
        <MenuItem onClick={colorMode.toggleColorMode}>
          <ListItemIcon
            // sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness2OutlinedIcon />
            ) : (
              <Brightness4OutlinedIcon />
            )}
          </ListItemIcon>
          {theme.palette.mode} mode
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <TranslateIcon />
          </ListItemIcon>
          Language
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HelpOutlineOutlinedIcon />
          </ListItemIcon>
          Help
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FeedbackOutlinedIcon />
          </ListItemIcon>
          Send feedback
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ProfileMenu;
