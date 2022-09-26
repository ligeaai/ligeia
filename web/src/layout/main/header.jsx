import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import TranslateIcon from "@mui/icons-material/Translate";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";
import LanguageIcon from "@mui/icons-material/Language";

import { changeTheme } from "../../services/actions/theme";
import { changeLanguage } from "../../services/actions/language";
import { setBlur, setFocus, setText } from "../../services/actions/searchBar";
import { toggleDrawer } from "../../services/reducers/drawerReducer";

import SearchBarMobile from "../../components/searchBar/searchBarMobile";
import NestedMenu from "./nestedMenu";
const Search = styled("div")(({ theme }) => {
  console.log(theme);
  return {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === "dark" ? "#ffffff33" : "#00000033",
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark" ? "#ffffff22" : "#00000022",
    },
    marginLeft: 0,
    width: "100%",
  };
});

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "text.primary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "0ch",
      "&:focus": {
        width: "auto",
      },
    },
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "28ch",
      },
    },
    [theme.breakpoints.up("md")]: {
      width: "34ch",
      "&:focus": {
        width: "60ch",
      },
    },
  },
}));
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const value = useSelector((state) => state.searchBar.text);
  const search = useSelector((state) => state.searchBar.isFocus);
  const theme = useSelector((state) => state.theme.theme);
  const lang = useSelector((state) => state.lang.lang);

  const [settingsMenu, setSettingsMenu] = React.useState(false);

  window.addEventListener("click", function (e) {
    if (!e.target.closest(".settingsMenu")) {
      console.log("sadasd");
      setSettingsMenu(false);
    }
  });

  const themeSelect = (val) => {
    dispatch(changeTheme(val));
  };
  const langSelect = (val) => {
    dispatch(changeLanguage(val));
  };
  const locationSelect = (val) => {};

  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: "primary.contrastText",
          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
          px: "26px",
          py: "18px",
          height: "75px",
          display: {
            xs: search ? "flex" : "none",
            md: "none",
          },
        }}
      >
        <SearchBarMobile theme={theme} />
      </Grid>
      <Grid
        container
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          px: "26px",
          py: "13px",
          height: "75px",
          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
          backgroundColor: "primary.contrastText",
          display: {
            xs: search ? "none" : "flex",
            md: "flex",
          },
        }}
      >
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <MenuIcon
                sx={{
                  typography: "h4",
                  color: "text.primary",
                }}
                onClick={() => {
                  dispatch(toggleDrawer());
                }}
              />
            </Grid>
            <Grid item>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  value={value}
                  onFocus={(e) => {
                    dispatch(setFocus());
                  }}
                  onBlur={() => {
                    dispatch(setBlur());
                  }}
                  onChange={(e) => {
                    dispatch(setText(e.target.value));
                  }}
                  sx={{
                    input: {
                      "&:hover": {
                        "&::placeholder": {
                          opacity: 1,
                        },
                      },
                      "&:focus": {
                        "&::placeholder": {
                          opacity: 1,
                        },
                      },
                    },
                  }}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item sx={{ position: "relative" }}>
              <Button
                sx={{
                  borderRadius: "60px",
                  height: "49px",
                  width: "49px !important",
                  p: 0,
                }}
              >
                <Badge
                  badgeContent={8}
                  color="error"
                  max={99}
                  sx={{ position: "absolute" }}
                >
                  <NotificationsNoneIcon
                    sx={{
                      color: "text.primary",
                    }}
                  />
                </Badge>
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
                <Grid item sx={{ mr: 1.5, ml: 1 }}>
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
                          color: "text.primary",
                        }}
                      >
                        {user
                          ? user.first_name.concat(" ", user.last_name)
                          : "name"}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
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
                  top: "75px",
                  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <NestedMenu
                  dict={[
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
                  isOpen={settingsMenu}
                  theme={theme}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
