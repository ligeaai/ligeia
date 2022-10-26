import React from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { changeTextParentCodeList } from "../../../../services/reducers/parentCodelist";
import { setIsUpdated } from "../../../../services/reducers/parentCodelist";
const MyTextField = ({ myKey }) => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.parentCodelist);

  return (
    <TextField
      variant="standard"
      value={rows[`${myKey}`]}
      onChange={(event) => {
        dispatch(setIsUpdated(true));
        dispatch(
          changeTextParentCodeList({ key: myKey, value: event.target.value })
        );
      }}
      InputProps={{
        disableUnderline: true,
      }}
    />
  );
};

export default MyTextField;
