import * as React from "react";
import { Dayjs } from "dayjs";
import { Grid, TextField, Typography } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const TimeRangePicker = () => {
  const [startDateValue, setStartDateValue] = React.useState(null);
  const [endDateValue, setEndDateValue] = React.useState(null);

  return (
    <Grid container sx={{ alignItems: "center" }}>
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDateValue}
            onChange={(newValue) => {
              setStartDateValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: "170px",
                  Input: {
                    fontSize: "14px",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2" sx={{ color: "text.primary", mx: 2 }}>
          to
        </Typography>
      </Grid>
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            value={endDateValue}
            onChange={(newValue) => {
              setEndDateValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: "170px",
                  Input: {
                    fontSize: "14px",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default TimeRangePicker;
