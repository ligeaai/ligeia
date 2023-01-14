import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Box, Typography } from "@mui/material";

import { LoadingComponent } from "../../../components";
import {
  changeSelectValue,
  changeValeus,
} from "../../../services/actions/overview/overviewDialog";
import { loadSelectItems } from "../../../services/actions/overview/overviewDialog";
import { updateChart } from "../../../services/actions/overview/taps";
import LinechartPopUp from "../../../components/highchart/popup/lineChartPopUp";
import AngularPopUp from "../../../components/highchart/popup/angularPopUp";
import SolidPopUp from "../../../components/highchart/popup/solidPopUp";
import MeasurementPopUp from "../../../components/highchart/popup/measurementPopUp";

const DialogContent = ({ highchartProps, chartId, ...rest }) => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.overviewDialog.values.Type);

  const body = {
    "Linechart [Highchart]": (
      <LinechartPopUp highchartProps={highchartProps} {...rest} />
    ),
    "Gauge(Angular) [Highchart]": (
      <AngularPopUp highchartProps={highchartProps} {...rest} />
    ),
    "Gauge(Solid) [Highchart]": (
      <SolidPopUp highchartProps={highchartProps} {...rest} />
    ),
    "Measurement [Custom]": (
      <MeasurementPopUp highchartProps={highchartProps} {...rest} />
    ),
  };
  React.useEffect(() => {
    async function myFunc() {
      dispatch(await loadSelectItems());
      await dispatch(await changeSelectValue(highchartProps.Type));
      Object.keys(highchartProps).map((e) => {
        dispatch(changeValeus(e, highchartProps[e]));
      });
    }
    myFunc();
  }, []);
  return (
    <Grid container sx={{ width: "100%" }}>
      <Typography
        id="draggable-dialog-title"
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          width: "100%",
          cursor: "all-scroll",
          backgroundColor: "background.main",
          p: 1,
        }}
      >
        {highchartProps.Type}
      </Typography>
      {type === highchartProps.Type ? (
        <Box sx={{ p: 2 }}>{body[highchartProps.Type]}</Box>
      ) : (
        <LoadingComponent />
      )}

      <Grid item xs={12}>
        <Grid container sx={{ flexDirection: "row-reverse", pb: 1, pr: 1 }}>
          <Grid item>
            <Button
              color="error"
              onClick={() => {
                rest.handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(updateChart(chartId));
                rest.handleClose();
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DialogContent;
