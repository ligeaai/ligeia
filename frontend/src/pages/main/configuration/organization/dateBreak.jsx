import React from "react";
import { useDispatch } from "react-redux";
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
import { MyTextField } from "./myTextField";
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
    //return <MyTextField {...params} />;

    // if (params.row.PROPERTY_TYPE === "INT") {
    //   return (
    //     <MyTextField myKey={`${params.row.LABEL_ID}`} textType="number" />
    //   );
    // }
    // if (params.row.PROPERTY_TYPE === "BOOL") {
    //   return (
    //     <Checkbox
    //       sx={{ margin: "auto" }}
    //       checked={
    //         typeRedux[`${params.row.LABEL_ID}`] === ""
    //           ? false
    //           : typeRedux[`${params.row.LABEL_ID}`]
    //       }
    //       onChange={(event) => {
    //         dispatch(
    //           changeValue({
    //             key: params.row.LABEL_ID,
    //             value: event.currentTarget.checked,
    //           })
    //         );
    //       }}
    //     />
    //   );
    // }
    // if (params.row.PROPERTY_TYPE === "HISTORY") {
    //   return (
    //     <LocalizationProvider dateAdapter={AdapterDayjs}>
    //       <DatePicker
    //         value={typeRedux[`${params.row.LABEL_ID}`]}
    //         onChange={(newValue) => {
    //           dispatch(
    //             changeValue({ key: params.row.LABEL_ID, value: newValue })
    //           );
    //         }}
    //         InputProps={{
    //           disableUnderline: true,
    //         }}
    //         renderInput={(params) => (
    //           <TextField {...params} variant="standard" />
    //         )}
    //       />
    //     </LocalizationProvider>
    //   );
    // }
    // try {
    //   if (params.row.PROPERTY_TYPE === "CODE") {
    //     return (
    //       <Box sx={{ minWidth: 120 }}>
    //         <FormControl fullWidth>
    //           <Select
    //             labelId="code-list"
    //             defaultValue={typeRedux[`${params.row.LABEL_ID}`]}
    //             value={typeRedux[`${params.row.LABEL_ID}`]}
    //             onChange={(event) => {
    //               dispatch(
    //                 changeValue({
    //                   key: params.row.LABEL_ID,
    //                   value: event.target.value,
    //                 })
    //               );
    //             }}
    //             sx={{
    //               ".MuiOutlinedInput-notchedOutline": { border: "none" },
    //               "::focus": {
    //                 ".MuiOutlinedInput-notchedOutline": { border: "none" },
    //               },
    //             }}
    //           >
    //             {params.row["CODE-LIST"][0].CHILD.map((e, key) => {
    //               return (
    //                 <MenuItem key={key} value={e.CODE_TEXT}>
    //                   {e.CODE_TEXT}
    //                 </MenuItem>
    //               );
    //             })}
    //           </Select>
    //         </FormControl>
    //       </Box>
    //     );
    //   }
    // } catch {
    //   return <Box>Empty List</Box>;
    // }
    //   };
  }
}

const crateColumn = () => {
  var uuid = uuidv4();
  return { key: uuid, value: new column({ uuid }) };
};

const DateBreak = () => {
  const dispatch = useDispatch();
  const instanttime = new Date();
  const [date, setDate] = React.useState(instanttime);
  return (
    <Grid container sx={{ alignItems: "center", height: "100%" }}>
      <Grid item sx={{ px: 1.5 }}>
        <Grid container sx={{ alignItems: "center" }}>
          <Button
            sx={{
              textTransform: "capitalize",
              fontSize: "12px",
              color: "#4B4B4B",
              pr: 1,
            }}
            onClick={() => {
              console.log("click");
              dispatch(addColum(crateColumn()));
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
          <DeleteForeverIcon fontSize="medium" /> Delete Selected Date Break
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
