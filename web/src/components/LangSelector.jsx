import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { ListItemIcon } from '@mui/material';
import LocationOnIcon from '@material-ui/icons/LocationOn';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 138,
    },
  },
};

const items = [
  'Русский',
  'English'
];
const LangSelector = () => {

    const [personName, setPersonName] = React.useState("English");
  
    const handleChange = (event) => {
      setPersonName(event.target.value);
    };
  
    return (
      <div>
        <FormControl sx={{ m: 1, width: 138 }}>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name={personName}
            value={personName}
            onChange={handleChange}
            MenuProps={MenuProps}

          >
            
            {items.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
}

export default LangSelector