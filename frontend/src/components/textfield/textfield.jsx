import React from "react";
import { TextField } from "@mui/material";
const MyTextfield = (props) => {
  console.log(props);
  const {
    handleChangeFunc = () => {},
    defaultValue = "",
    errFunc = () => {
      return false;
    },
    ...rest
  } = props;
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    handleChangeFunc(e.target.value);
  };
  console.log(defaultValue);
  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <TextField
      {...rest}
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
