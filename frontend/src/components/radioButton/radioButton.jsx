import * as React from "react";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export default function CheckboxList(props) {
  const {
    data,
    handleToggleFunc,
    dataTextPath = false,
    dataValuePath = false,
    defaultData = [],
  } = props;
  const [value, setValue] = React.useState(defaultData);
  const handleChange = (event) => {
    setValue(event.target.value);
    handleToggleFunc(event.target.value);
  };

  return data.length === 0 ? (
    <Box sx={{ width: "100%", textAlign: "center", fontSize: "14px" }}>
      No Data
    </Box>
  ) : (
    <RadioGroup disablePadding value={value} onChange={handleChange}>
      {data.map((e, i) => {
        return (
          <FormControlLabel
            key={i}
            value={dataValuePath ? e[dataValuePath] : e}
            control={<Radio />}
            label={dataTextPath ? e[dataTextPath] : e}
          />
        );
      })}
    </RadioGroup>
  );
}
