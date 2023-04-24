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
  const permission = useSelector(
    (state) => state.auth.user?.role?.PROPERTY_ID?.CONFIG
  );
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
    <Grid
      container
      className="item-container__body__action-box__date-break__container"
    >
      <Grid item>
        <Grid
          container
          className="item-container__body__action-box__date-break__container__btn-box"
        >
          <Button
            className="item-container__body__action-box__date-break__container__btn-box__btn"
            disabled={props || !(permission?.CREATE || permission?.UPDATE)}
            onClick={() => {
              if (checkDateBreaks(date)) {
                dispatch(addNewColumn(dateFormatter(date)));
              }
            }}
          >
            Add a Date Break:
          </Button>
          <Grid
            className="item-container__body__action-box__date-break__container__btn-box__date-picker"
            item
          >
            <DatePicker time={date} onChangeFunc={onChange} disabled={props} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(DateBreak);
