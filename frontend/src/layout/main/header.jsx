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
import { changeLanguage, changeLangs } from "../../services/actions/language";
import { toggleDrawerMenu } from "../../services/actions/drawerMenu/drawerMenu";
import { SearchBarMobile, SearchBar } from "../../components";
import NestedMenu from "./nestedMenu";
import { instance, config } from "../../services/baseApi";
import history from "../../routers/history";

import SettingMenu from "./settingsMenu";

const searchBarSize = {
  sm: { focus: "28ch", blur: "16ch" },
  md: { focus: "60ch", blur: "34ch" },
  lg: { focus: "60ch", blur: "34ch" },
  xl: { focus: "60ch", blur: "34ch" },
};

const DrawerIcon = () => {
  const dispatch = useDispatch();
  const drawerIsOpen = useSelector((state) => state.drawerMenu.isOpen);
  return (
    <Grid item>
      {!drawerIsOpen ? (
        <MenuIcon
          sx={{
            mx: "9px",
            typography: "h4",
            color: "#ffffff",
          }}
          onClick={() => {
            dispatch(toggleDrawerMenu());
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
            dispatch(toggleDrawerMenu());
          }}
        />
      )}
    </Grid>
  );
};

const Header = (props) => {
  const search = useSelector((state) => state.searchBar.isFocus);
  const { delSearchBar } = props;
  const theme = useSelector((state) => state.theme.theme);

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
              <DrawerIcon />
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
            <SettingMenu />
          </Grid>
        </Grid>
      </MyBox>
    </React.Fragment>
  );
};

export default React.memo(Header);
