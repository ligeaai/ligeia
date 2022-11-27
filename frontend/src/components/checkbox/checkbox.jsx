import React from "react";
import Checkbox from "@mui/material/Checkbox";
const MyCheckbox = (props) => {
  const {
    handleChangeFunc = () => {},
    defaultValue = false,
    errFunc = () => {
      return false;
    },
  } = props;
  const [value, setValue] = React.useState(defaultValue);
  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const handleChange = () => {
    handleChangeFunc(!value);
    setValue(!value);
  };
  return (
    <Checkbox
      checked={value}
      onChange={handleChange}
      error={errFunc()}
      sx={{ fontSize: "14px" }}
    />
  );
};

export default MyCheckbox;
