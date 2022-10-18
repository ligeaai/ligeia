import React from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { changeTextValue } from "../../../../services/reducers/typeTextReducer";
const MyTextField = ({ myKey, textType }) => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.typeText);
  return (
    <TextField
      variant="standard"
      type={textType}
      value={type[`${myKey}`]}
      onChange={(event) => {
        dispatch(changeTextValue({ key: myKey, value: event.target.value }));
      }}
      InputProps={{
        disableUnderline: true,
      }}
    />
  );
};

export default MyTextField;
