import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

import { grey } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  addColum,
  deleteColum,
} from "../../../../services/actions/company/datagrid";
import { MyTextField, MyTextFieldRender } from "./myTextField";
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export class column {
  constructor(props) {
    this.field = props.uuid;
    this.headerName = "";
    this.width = 150;
    this.filterable = false;
    this.sortable = false;
    this.editable = true;
    this.renderCell = MyTextField;
    this.renderEditCell = MyTextField;
    this.valueOptions = ({ row }) => {
      var myList = [];
      myList.push("");
      console.log(row);
      var temp = row.CODE_LIST[0].CHILD.sort((a, b) =>
        a.CODE > b.CODE ? 1 : -1
      );
      temp.map((e) => {
        if (e.CODE_TEXT) {
          myList.push(e.CODE_TEXT);
        } else {
          console.log(e);
        }
      });
      return myList;
    };
  }
}

const crateColumn = (time) => {
  var uuid = uuidv4();
  return { key: uuid, value: new column({ uuid }) };
};

const DateBreak = () => {
  const dispatch = useDispatch();
  const instanttime = new Date();
  const [date, setDate] = React.useState(instanttime);
  const usedDates = useSelector((state) => state.companyDataGrid.rows.HISTORY);
  const checkDateBreaks = (date) => {
    var returnValue = true;
    Object.keys(usedDates).map((e) => {
      var d = date.getDate();
      var m = date.getMonth();
      m += 1;
      var y = date.getFullYear();
      var dateNew = y + "-" + m + "-" + d;
      console.log(usedDates[e]);
      try {
        var d = usedDates[e].getDate();
        var m = usedDates[e].getMonth();
        m += 1;
        var y = usedDates[e].getFullYear();
        var usedDatesNew = y + "-" + m + "-" + d;
      } catch {}
      if (dateNew === usedDatesNew) {
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
              color: "#4B4B4B",
              pr: 1,
            }}
            onClick={() => {
              if (checkDateBreaks(date)) {
                dispatch(addColum(crateColumn(), date));
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

      {/* <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          marginX: "2px",
          borderWidth: "0.2px",
          borderColor: "#4B4B4B",
          backgroundColor: "#4B4B4B",
        }}
      />

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
      </Grid> */}

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          marginX: "2px",
          borderWidth: "0.2px",
          borderColor: "#4B4B4B",
          backgroundColor: "#4B4B4B",
        }}
      />

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

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          marginX: "2px",
          borderWidth: "0.2px",
          borderColor: "#4B4B4B",
          backgroundColor: "#4B4B4B",
        }}
      />

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
