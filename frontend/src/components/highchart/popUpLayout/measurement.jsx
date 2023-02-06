import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import MyNumberTextField from "../../textfield/numberTextField";
const Measurement = () => {
  const dispatch = useDispatch();
  const minimum = useSelector(
    (state) => state.overviewDialog.highchartProps.Minimum
  );
  const maximum = useSelector(
    (state) => state.overviewDialog.highchartProps.Maximum
  );
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <React.Fragment>
      <Grid item xs={12} sm={4.5}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12}>
            Minimum
          </Grid>
          <Grid item xs={12}>
            <MyNumberTextField
              defaultValue={minimum}
              disabled={true}
              handleChangeFunc={(value) => {
                handleChangeFunc("Minimum", value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4.5}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12}>
            Maximum
          </Grid>
          <Grid item xs={12}>
            <MyNumberTextField
              defaultValue={maximum}
              disabled={true}
              handleChangeFunc={(value) => {
                handleChangeFunc("Maximum", value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Measurement;
