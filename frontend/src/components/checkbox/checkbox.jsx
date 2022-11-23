import React from "react";
import Checkbox from "@mui/material/Checkbox";
const MyCheckbox = (props) => {
  const { handleChangeFunc = () => {}, defaultValue = false } = props;
  const [value, setValue] = React.useState(defaultValue);
  const handleChange = () => {
    handleChangeFunc(!value);
    setValue(!value);
  };
  return <Checkbox checked={value} onChange={handleChange} />;
};

export default MyCheckbox;
