import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, TextField } from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addNewColumn } from "../../../../../services/actions/item/itemDataGrid";
import { dateFormatter } from "../../../../../services/utils/dateFormatter";
const DateBreak = ({ props }) => {
  const dispatch = useDispatch();
  const instanttime = new Date();
  const [date, setDate] = React.useState(instanttime);
  const usedDates = useSelector((state) => state.itemDataGrid.rows.HISTORY);
  const checkDateBreaks = (date) => {
    var returnValue = true;
    Object.keys(usedDates).map((e) => {
      var dateNew = dateFormatter(date);
      if (dateNew === e) {
        dispatch({
          type: "ADD_ERROR_SUCCESS",
          payload: "The dates cannot be the same",
        });
        returnValue = false;
      }
    });
    return returnValue;
  };
  return (
    <Grid container sx={{ alignItems: "center", height: "100%" }}>
      <Grid item>
        <Grid container sx={{ alignItems: "center" }}>
          <Button
            sx={{
              textTransform: "capitalize",
              fontSize: "12px",
              color: "status.primary",
              pr: 1,
            }}
            disabled={props}
            onClick={() => {
              if (checkDateBreaks(date)) {
                dispatch(addNewColumn(dateFormatter(date)));
              }
            }}
          >
            Add a Date Break:
          </Button>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={(newValue) => {
                  setDate(newValue.$d);
                }}
                disabled={props}
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
                          color: "icon.secondary",
                        },
                      },
                      Input: {
                        color: "text.primary",
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
    </Grid>
  );
};

export default DateBreak;
