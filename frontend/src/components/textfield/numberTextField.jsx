import React from "react";
import { TextField } from "@mui/material";
const MyNumberTextField = (props) => {
  const { handleChangeFunc = () => {}, defaultValue = "" } = props;
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    handleChangeFunc(e.target.value);
  };
  return (
    <TextField
      variant="outlined"
      type="number"
      onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
      value={value}
      onChange={handleChange}
      sx={{
        fontSize: "14px",
        "& .MuiOutlinedInput-input": {
          paddingTop: "4px",
          paddingBottom: "4px",
        },
        width: 120,
      }}
    />
  );
};

export default MyNumberTextField;