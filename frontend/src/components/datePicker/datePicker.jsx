import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const MaterialUIPickers = ({
  time = "9000-10-10",
  onChangeFunc = () => {},
  errFunc = () => false,
  ...props
}) => {
  const [date, setDate] = React.useState(time);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={date}
        onChange={(newValue) => {
          try {
            setDate(newValue.$d);
            onChangeFunc(newValue.$d);
          } catch {}
        }}
        components={{
          OpenPickerIcon: CalendarTodayIcon,
        }}
        inputFormat="DD/MM/YYYY"
        {...props}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            sx={{
              minWidth: "125px",
              width: "100%",
              border: "none",
              ".MuiInputAdornment-root": {
                pl: 0,
                ml: 0,
                button: {
                  svg: {
                    fontSize: "medium",
                  },
                  color: "primary.main",
                },
              },
              Input: {
                color: "primary.main",
                fontSize: "12px",
                paddingY: "6px",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default React.memo(MaterialUIPickers);
