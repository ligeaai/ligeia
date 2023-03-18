import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button } from "@mui/material";

import { DatePicker } from "../../../../../components";

import { addNewColumn } from "../../../../../services/actions/item/itemDataGrid";
import { dateFormatter } from "../../../../../services/utils/dateFormatter";
const DateBreak = ({ props }) => {
  const dispatch = useDispatch();
  const instanttime = new Date();
  const [date, setDate] = React.useState(instanttime);
  const usedDates = useSelector((state) => state.itemDataGrid.col);
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
  const onChange = (newValue) => {
    setDate(newValue);
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
              mx: "2px",
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
          <Grid item sx={{ width: "125px" }}>
            <DatePicker
              time={instanttime}
              onChangeFunc={onChange}
              disabled={props}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(DateBreak);
