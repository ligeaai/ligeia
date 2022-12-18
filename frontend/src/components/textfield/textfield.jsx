import React from "react";
import { TextField } from "@mui/material";
const MyTextfield = (props) => {
  const {
    handleChangeFunc = () => {},
    defaultValue = "",
    errFunc = () => {
      return false;
    },
  } = props;
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    handleChangeFunc(e.target.value);
  };
  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <TextField
      error={errFunc()}
      variant="outlined"
      value={value}
      onChange={handleChange}
      sx={{
        fontSize: "14px",
        "& .MuiOutlinedInput-input": {
          fontSize: "14px",
          paddingTop: "4px",
          paddingBottom: "4px",
        },
        width: "100%",
        minWidth: 125,
      }}
    />
  );
};

export default MyTextfield;
