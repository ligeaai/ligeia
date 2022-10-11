import * as React from "react";
import { useDispatch } from "react-redux";
import { Dayjs } from "dayjs";

import { Grid, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { add_error } from "../../services/actions/error";

const TimeRangePicker = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const [startDateValue, setStartDateValue] = React.useState(date);
  const [endDateValue, setEndDateValue] = React.useState("10.10.9000");

  return (
    <Grid container sx={{ alignItems: "center", height: "43px" }}>
      <Grid item>
        <Typography
          variant="caption"
          sx={{ color: "text.primary", mx: 2, pb: 1.5 }}
        >
          Start:
        </Typography>
      </Grid>
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={startDateValue}
            maxDate={date}
            onChange={(newValue) => {
              setStartDateValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                variant="standard"
                {...params}
                sx={{
                  width: "150px",
                  ".MuiInputAdornment-root": {
                    mb: 1,
                    pl: 0,
                    ml: 0,
                  },
                  Input: {
                    fontSize: "12px",
                    paddingTop: "0px",
                    textAlign: "center",
                    fontWeight: "bold",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item>
        <Typography
          variant="caption"
          sx={{ color: "text.primary", mx: 2, pb: 1.5 }}
        >
          End:
        </Typography>
      </Grid>
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={endDateValue}
            onChange={(newValue) => {
              if (newValue >= startDateValue) {
                setEndDateValue(newValue);
              } else {
                dispatch(
                  add_error("End date cannot be earlier than start date.")
                );
              }
            }}
            renderInput={(params) => (
              <TextField
                variant="standard"
                {...params}
                sx={{
                  width: "150px",
                  ".MuiInputAdornment-root": {
                    mb: 1,
                    pl: 0,
                    ml: 0,
                  },
                  Input: {
                    textAlign: "center",
                    fontSize: "12px",
                    paddingTop: "0px",
                    fontWeight: "bold",
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
