import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BadgeUnstyled, { badgeUnstyledClasses } from "@mui/base/BadgeUnstyled";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import TranslateIcon from "@mui/icons-material/Translate";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";
import LanguageIcon from "@mui/icons-material/Language";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

import { changeTheme } from "../../services/actions/theme";
import { changeLanguage } from "../../services/actions/language";
import { toggleDrawer } from "../../services/reducers/drawerReducer";
import { SearchBarMobile, SearchBar } from "../../components";
import NestedMenu from "./nestedMenu";

const searchBarSize = {
  sm: { focus: "28ch", blur: "16ch" },
  md: { focus: "60ch", blur: "34ch" },
  lg: { focus: "60ch", blur: "34ch" },
  xl: { focus: "60ch", blur: "34ch" },
};
const Header = (props) => {
  const { delSearchBar } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const search = useSelector((state) => state.searchBar.isFocus);
  const theme = useSelector((state) => state.theme.theme);
  const lang = useSelector((state) => state.lang.lang);
  const drawerIsOpen = useSelector((state) => state.drawer.isOpen);
  const [settingsMenu, setSettingsMenu] = React.useState(false);

  window.addEventListener("click", function (e) {
    if (!e.target.closest(".settingsMenu")) {
      setSettingsMenu(false);
    }
  });

  const themeSelect = (theme) => {
    dispatch(changeTheme(theme));
  };
  const langSelect = (language) => {
    dispatch(changeLanguage(language));
  };
  const locationSelect = (location) => {};

  const MyBox = styled(Grid)(({ theme }) => ({
    backgroundColor: "#7E99AA",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 21px",
    height: "59px",
    borderBottom: "1px solid rgba(0,0,0,0.3)",
  }));

  const StyledBadge = styled(BadgeUnstyled)(
    ({ theme }) => `
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 18px;
    list-style: none;
    font-family: IBM Plex Sans, sans-serif;
    position: relative;
    display: inline-block;
    line-height: 1;
  
    & .${badgeUnstyledClasses.badge} {
      z-index: auto;
      position: absolute;
      top: 3px;
      right: 3px;
      min-width: 22px;
      height: 22px;
      background:#EA5455;
      color: #fff;
      font-weight: 600;
      font-size: 12px;
      line-height: 22px;
      white-space: nowrap;
      text-align: center;
      border-radius: 12px;
      transform: translate(50%, -50%);
      transform-origin: 100% 0; 
    }
    `
  );

  return (
    <React.Fragment>
      <MyBox
        container
        sx={{
          display: {
            xs: search ? "flex" : "none",
            md: "none",
          },
        }}
      >
        <SearchBarMobile theme={theme} />
      </MyBox>
      <MyBox
        sx={{
          display: {
            xs: search ? "none" : "flex",
            md: "flex",
          },
        }}
      >
        <Grid item>
          <Grid container spacing={2.5} alignItems="center">
            <Grid item>
              {!drawerIsOpen ? (
                <MenuIcon
                  sx={{
                    mx: "9px",
                    typography: "h4",
                    color: "#ffffff",
                  }}
                  onClick={() => {
                    dispatch(toggleDrawer());
                  }}
                />
              ) : (
                <MenuOpenOutlinedIcon
                  sx={{
                    mx: "9px",
                    typography: "h4",
                    color: "#ffffff",
                  }}
                  onClick={() => {
                    dispatch(toggleDrawer());
                  }}
                />
              )}
            </Grid>
            <Grid item>
              {delSearchBar ? null : (
                <SearchBar
                  searchBarSize={searchBarSize}
                  searchBarTheme={theme}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item sx={{ position: "relative" }}>
              <Button
                sx={{
                  borderRadius: "60px",
                  height: "49px",
                  width: "49px !important",
                }}
              >
                <StyledBadge badgeContent={8} max={99}>
                  <NotificationsNoneIcon
                    sx={{
                      color: "#ffffff",
                    }}
                  />
                </StyledBadge>
              </Button>
            </Grid>
            <Grid item className="settingsMenu">
              <Grid
                container
                alignItems="center"
                onClick={(e) => {
                  setSettingsMenu(!settingsMenu);
                }}
              >
                <Grid item sx={{ mr: 1.5 }}>
                  <Grid
                    container
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Grid item>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                          color: "#ffffff",
                        }}
                      >
                        {user
                          ? // ? user.first_name.concat(" ", user.last_name)
                            user.first_name
                          : "name"}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#ffffffAA",
                          textTransform: "capitalize",
                        }}
                      >
                        role
                      </Typography>{" "}
                      {/* //todo add role */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Avatar
                    alt={
                      user
                        ? user.first_name.concat(" ", user.last_name)
                        : "name"
                    }
                    src="/"
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: settingsMenu ? "flex" : "none",
                  position: "absolute",
                  right: { xs: "0" },
                  top: "62px",
                  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                  zIndex: 3,
                }}
              >
                <NestedMenu
                  menuItems={[
                    {
                      icon: <Brightness2OutlinedIcon />,
                      fixedText: "Appearance",
                      text: theme,
                      subtable: ["dark", "light"],
                      functions: themeSelect,
                    },
                    {
                      icon: <TranslateIcon />,
                      fixedText: "Language",
                      text: lang,
                      subtable: ["English", "Kazakça", "Rusça", "Türkçe"],
                      functions: langSelect,
                    },
                    {
                      icon: <LanguageIcon />,
                      fixedText: "Location",
                      text: "Canada",
                      subtable: ["Canada", "Kazakistan", "Türkiye"],
                      functions: locationSelect,
                    },
                  ]}
                  isSubmenuOpen={settingsMenu}
                  themeMode={theme}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </MyBox>
    </React.Fragment>
  );
};

export default Header;
