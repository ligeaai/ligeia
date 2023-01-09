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
  cardinalityCheck,
} from "../../../../../services/actions/item/checkedList";
const MyCheckList = (props) => {
  const dispatch = useDispatch();
  const instanttime = new Date();
  const [date, setDate] = React.useState(instanttime);
  const [selectedItem, setSelectedItem] = React.useState("");
  const data = useSelector((state) => state.checkedList.listItem);
  const checkedItemsLen = useSelector(
    (state) => state.checkedList.checkedItems.length
  );
  const linkEditorData = useSelector(
    (state) => state.itemLinkEditor[props.dataSelectItemPath]
  );
  const selectItems = linkEditorData
    ? linkEditorData.filter((e) => e.TYPE === props.data.TYPE)
    : [];
  const handleChange = (event) => {
    const e = selectItems.find((e) =>
      props.dataSelectItemPath === "data"
        ? e.FROM_TYPE === event.target.value
        : e.TO_TYPE === event.target.value
    );
    setSelectedItem(event.target.value);
    dispatch(loadCheckedList(e, props.dataSelectItemPath));
  };
  const handleToggleFunc = (data) => {
    dispatch(toggleChecked(data));
  };
  return (
    <React.Fragment>
      <Box sx={{ m: 1 }}>
        <Grid
          container
          style={{ cursor: "move", justifyContent: "space-between" }}
          id="draggable-dialog-title"
        >
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
                          color: "text.primary",
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
                  key={
                    props.dataSelectItemPath === "data"
                      ? e.FROM_TYPE
                      : e.TO_TYPE
                  }
                  value={
                    props.dataSelectItemPath === "data"
                      ? e.FROM_TYPE
                      : e.TO_TYPE
                  }
                  sx={{ fontSize: "14px" }}
                >
                  {props.dataSelectItemPath === "data"
                    ? e.FROM_SHORT_LABEL
                    : e.TO_SHORT_LABEL}
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
        <Grid item sx={{ pl: 1, fontSize: "14px" }}>
          Selected Items:{checkedItemsLen}
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Button
                onClick={() => {
                  props.onClose();
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={async () => {
                  if (
                    await dispatch(cardinalityCheck(selectItems, selectedItem))
                  ) {
                    dispatch(
                      saveLinks(
                        date,
                        selectItems[0].TYPE,
                        selectItems[0].TO_TYPE
                      )
                    );
                    props.onClose();
                  } else {
                    dispatch({
                      type: "ADD_ERROR_SUCCESS",
                      payload: "Cardinality error",
                    });
                  }
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MyCheckList;
