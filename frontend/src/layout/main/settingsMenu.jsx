import * as React from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Box, Grid, Typography } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";
import LanguageIcon from "@mui/icons-material/Language";

import { changeTheme } from "../../services/actions/theme";
import { changeLanguage, changeLangs } from "../../services/actions/language";

import NestedMenu from "./nestedMenu";
import { instance, config } from "../../services/baseApi";

const SettingsMenu = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const user = useSelector((state) => state.auth.user);
  const lang = useSelector((state) => state.lang.lang);
  const [settingsMenu, setSettingsMenu] = React.useState(false);
  const [languages, setLanguages] = React.useState(false);
  const [langItems, setLangItems] = React.useState([]);

  const setSettingsMenuFunc = () => {
    setSettingsMenu(false);
  };

  React.useEffect(() => {
    const myFunc = async () => {
      try {
        let res = await instance.get(`/code-list/culture/`, config());
        var myRes = [];
        res.data.Message.map((e) => {
          myRes.push(e.CODE_TEXT);
        });
        setLanguages(res.data.Message);
        setLangItems([...myRes]);
      } catch {}
    };
    myFunc();
    return;
  }, []);

  const themeSelect = (theme) => {
    $("#main-box").removeClass().addClass(`theme-${theme}`);
    localStorage.setItem("theme", `theme-${theme}`);
    dispatch(changeTheme(theme));
  };
  const langSelect = (language) => {
    languages.map((e) => {
      if (e.CODE_TEXT === language) {
        dispatch(changeLanguage(e.CULTURE));
        dispatch(changeLangs(e.CODE_TEXT));
      }
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const locationSelect = (location) => {};

  return (
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
                  color: "primary.main",
                }}
              >
                {user?.first_name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="caption"
                sx={{
                  color: "primary.main",
                  textTransform: "capitalize",
                }}
              >
                {user?.role?.ROLES_NAME}
              </Typography>
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
      {settingsMenu ? (
        <Box
          sx={{
            display: "flex",
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
                subtable: ["dark", "light", "temp", "tempDark"],
                functions: themeSelect,
              },
              {
                icon: <TranslateIcon />,
                fixedText: "Language",
                text: lang,
                subtable: langItems,
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
            setSettingsMenuFunc={setSettingsMenuFunc}
            themeMode={theme}
          />
        </Box>
      ) : null}
    </Grid>
  );
};

export default SettingsMenu;
