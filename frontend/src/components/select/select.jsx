import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MySelect(props) {
  const { values = [], handleChangeFunc = () => {}, defaultValue = "" } = props;
  const [selectedItem, setSelectedItem] = React.useState(defaultValue);

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    handleChangeFunc(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          value={selectedItem}
          onChange={handleChange}
          sx={{
            fontSize: "14px",
            "& .MuiOutlinedInput-input": { py: 0.5 },
          }}
        >
          {values.map((e, key) => (
            <MenuItem key={key} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
