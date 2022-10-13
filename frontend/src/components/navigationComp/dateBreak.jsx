import React from "react";

import { Box, Grid, Button, TextField, Typography } from "@mui/material";

import { grey } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SeperatorLineVertical = () => {
  return (
    <Box
      sx={{
        height: "26px",
        width: "2px",
        backgroundColor: "#4B4B4B",
        marginX: "2px",
      }}
    />
  );
};

const DateBreak = () => {
  const instanttime = new Date();
  const [date, setDate] = React.useState(instanttime);
  return (
    <Grid container sx={{ alignItems: "center", height: "100%" }}>
      <Grid item sx={{ px: 1.5 }}>
        <Grid container sx={{ alignItems: "center" }}>
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: "12px",
              color: "#4B4B4B",
              pr: 1,
            }}
          >
            Add a Date Break:
          </Typography>
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
                        button: {
                          svg: {
                            fontSize: "medium",
                          },
                          color: "#4B4B4B",
                        },
                      },
                      Input: {
                        color: "#4B4B4B",
                        fontSize: "12px",
                        paddingY: "6px",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <SeperatorLineVertical />
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          sx={{
            height: "36px",
            textTransform: "capitalize",
            fontSize: "12px",
            color: "#4B4B4B",
            px: 1,
            border: "none",
            "&:hover": {
              backgroundColor: grey[300],
              border: "none",
            },
          }}
        >
          <DeleteForeverIcon fontSize="medium" /> Delete Selected Date Break
        </Button>
      </Grid>
      <Grid item>
        <SeperatorLineVertical />
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          sx={{
            height: "36px",
            textTransform: "capitalize",
            fontSize: "12px",
            color: "#4B4B4B",
            px: 1,
            border: "none",
            "&:hover": {
              backgroundColor: grey[300],
              border: "none",
            },
          }}
        >
          <FolderCopyOutlinedIcon fontSize="small" sx={{ mr: 0.4 }} /> Apply
          Template
        </Button>
      </Grid>
      <Grid item>
        <SeperatorLineVertical />
      </Grid>
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
