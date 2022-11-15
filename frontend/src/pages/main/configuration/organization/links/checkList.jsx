import { Divider } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material/";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { CheckboxList } from "../../../../../components";
import {
  loadCheckedList,
  saveLinks,
  toggleChecked,
} from "../../../../../services/actions/company/checkedList";
const MyCheckList = (props) => {
  const dispatch = useDispatch();
  const instanttime = new Date();
  const [date, setDate] = React.useState(instanttime);
  const [selectedItem, setSelectedItem] = React.useState("");
  const data = useSelector((state) => state.companyCheckedList.listItem);
  const linkEditorData = useSelector((state) => state.linkEditor.data);
  const selectItems = linkEditorData.filter((e) => e.TYPE === props.data.TYPE);
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
    dispatch(loadCheckedList(event.target.value));
  };
  const handleToggleFunc = (data) => {
    dispatch(toggleChecked(data));
  };
  return (
    <React.Fragment>
      <Box sx={{ m: 1 }}>
        <Grid container sx={{ justifyContent: "space-between" }}>
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
          <Grid item>
            <Select
              placeholder={props.data.TYPE}
              value={selectedItem}
              onChange={handleChange}
              sx={{
                fontSize: "14px",
                "& .MuiOutlinedInput-input": { py: 0.5 },
              }}
            >
              {selectItems.map((e) => (
                <MenuItem
                  key={e.FROM_TYPE}
                  value={e.FROM_TYPE}
                  sx={{ fontSize: "14px" }}
                >
                  {e.FROM_TYPE}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <CheckboxList
        data={data}
        dataTextPath="NAME"
        handleToggleFunc={handleToggleFunc}
      />
      <Divider />
      <Grid
        container
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Grid item sx={{ pl: 1 }}>
          Selected Items Count:0
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              dispatch(saveLinks(date, selectItems[0].TYPE));
              props.onClose();
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MyCheckList;
