import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  Typography,
} from "@mui/material";

import earthIcon from "../assets/Images/header/Vector.png";
import { changeLanguage } from "../services/actions/language";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 138,
    },
  },
};

const items = ["Русский", "English"];

const LangSelector = () => {
  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(changeLanguage(event.target.value));
  };

  return (
    <div>
      <FormControl sx={{ mx: 1, width: 148 }}>
        <Select
          variant="standard"
          disableUnderline
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          name={lang}
          value={lang}
          onChange={handleChange}
          MenuProps={MenuProps}
          sx={{ pl: 0 }}
          startAdornment={
            <InputAdornment position="start">
              <img src={earthIcon} alt="" />
            </InputAdornment>
          }
        >
          {items.map((langname) => (
            <MenuItem key={langname} value={langname}>
              <Typography
                align="center"
                variant="h6"
                sx={{ fontWeight: "400" }}
              >
                {langname}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default LangSelector;
