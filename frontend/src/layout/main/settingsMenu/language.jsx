import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MenuItem, Box, Divider } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import MenuItems from "./menuItem";
import {
  changeLanguage,
  changeLangs,
} from "../../../services/actions/language";
import CodelistService from "../../../services/api/codeList";

const ChangeTemp = ({ changeMenu, handleClose }) => {
  const dispatch = useDispatch();
  const activeLang = useSelector((state) => state.lang.lang);
  const [langItems, setLangItems] = React.useState([]);
  React.useEffect(() => {
    const myFunc = async () => {
      try {
        let res = await CodelistService.getCultures();
        setLangItems(res.data.Message);
      } catch {}
    };
    myFunc();
    return;
  }, []);

  const langSelect = (language) => {
    dispatch(changeLanguage(language.CULTURE));
    dispatch(changeLangs(language.CODE_TEXT));

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <>
      <MenuItem
        onClick={() => {
          changeMenu("main");
        }}
      >
        <MenuItems Icon={ArrowBackIcon} text="Languages" />
      </MenuItem>
      <Divider />
      {langItems.map((e, i) => {
        return (
          <MenuItem
            key={i}
            onClick={() => {
              langSelect(e);
            }}
          >
            <Box className="settings-container__main-menu__item-icon-box">
              {activeLang === e.CODE_TEXT && <DoneIcon />}
            </Box>
            {e.CODE_TEXT.charAt(0).toUpperCase() + e.CODE_TEXT.slice(1)}
          </MenuItem>
        );
      })}
    </>
  );
};

export default ChangeTemp;
