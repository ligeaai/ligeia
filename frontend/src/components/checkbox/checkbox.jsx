import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
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
    <Box sx={{ minWidth: "125px", width: "100%" }}>
      <Checkbox
        size="small"
        checked={value}
        onChange={handleChange}
        error={errFunc()}
        sx={{ fontSize: "14px", padding: "4px" }}
      />
    </Box>
  );
};

export default MyCheckbox;
