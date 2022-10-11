import React from "react";

import { Box, Grid, Button, TextField } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SeperatorLineVertical = () => {
  return (
    <Box
      sx={{
        height: "24px",
        width: "1.5px",
        backgroundColor: "text.secondary",
      }}
    />
  );
};

const DateBreak = () => {
  const instanttime = new Date();
  const [date, setDate] = React.useState(instanttime);
  return (
    <Grid container sx={{ alignItems: "center" }}>
      <Grid item sx={{ pr: 1.5 }}>
        <Grid container sx={{ alignItems: "center" }}>
          <Button
            sx={{
              textTransform: "capitalize",
              typography: "subtitle2",
              color: "text.secondary",
            }}
          >
            Add a Date Break:
          </Button>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                components={{
                  OpenPickerIcon: CalendarTodayIcon,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    sx={{
                      width: "125px",
                      border: "none",
                      ".MuiInputAdornment-root": {
                        pl: 0,
                        ml: 0,
                      },
                      Input: {
                        fontSize: "12px",
                        paddingY: "6px",
                        fontWeight: "bold",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
      <SeperatorLineVertical />
      <Grid item>
        <Button
          sx={{
            textTransform: "capitalize",
            typography: "subtitle2",
            color: "text.secondary",
          }}
        >
          <DeleteForeverIcon /> Delete Selected Date Brek
        </Button>
      </Grid>
      <SeperatorLineVertical />
      <Grid item>
        <Button
          sx={{
            textTransform: "capitalize",
            typography: "subtitle2",
            color: "text.secondary",
          }}
        >
          <QuestionMarkIcon />
          Apply Template
        </Button>
      </Grid>
      <SeperatorLineVertical />
      {/* <Grid item>
        <Button
          sx={{
            textTransform: "capitalize",
            typography: "subtitle2",
            color: "text.secondary",
          }}
        >
          View Active Only
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default DateBreak;
