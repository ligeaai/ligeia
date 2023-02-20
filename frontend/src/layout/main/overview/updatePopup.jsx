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
      <LinechartPopUp title={"Linechart [Highchart]"} {...rest} />
    ),
    "Area Chart [Highchart]": (
      <LinechartPopUp title={"Area Chart [Highchart]"} {...rest} />
    ),
    "Gauge(Angular) [Highchart]": (
      <AngularPopUp title={"Gauge(Angular) [Highchart]"} {...rest} />
    ),
    "Gauge(Solid) [Highchart]": (
      <SolidPopUp title={"Gauge(Solid) [Highchart]"} {...rest} />
    ),
    "Measurement [Custom]": (
      <MeasurementPopUp title={"Measurement [Custom]"} {...rest} />
    ),
    "Bar Chart [Nivo]": <AngularPopUp title={"Bar Chart [Nivo]"} {...rest} />,
    "Pie Chart [Nivo]": <AngularPopUp title={"Pie Chart [Nivo]"} {...rest} />,
    "Heat Map [Nivo]": <AngularPopUp title={"Heat Map [Nivo]"} {...rest} />,
    "Matrix [Custom]": <AngularPopUp title={"Matrix [Custom]"} {...rest} />,
    "Line Chart [Nivo]": (
      <LinechartPopUp title={"Line Chart [Nivo]"} {...rest} />
    ),
    "TreeMap Chart [Nivo]": (
      <AngularPopUp title={"TreeMap Chart [Nivo]"} {...rest} />
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
    <Grid container sx={{ width: "100%", height: "100%" }}>
      {type === highchartProps.Type ? (
        body[highchartProps.Type]
      ) : (
        <Grid item xs={12} sx={{ width: "250px", height: "300px" }}>
          <LoadingComponent />
        </Grid>
      )}

      <Grid
        item
        xs={12}
        sx={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          backgroundColor: "background.main",
        }}
      >
        <Grid
          container
          sx={{
            flexDirection: "row-reverse",
            p: 0.5,
            alignItems: "center",
            height: "100%",
          }}
        >
          <Grid item>
            <Button
              color="inherit"
              onClick={() => {
                rest.handleClose();
              }}
              sx={{ mr: 0.5 }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                dispatch(updateChart(chartId));
                rest.handleClose();
                rest.refresh();
              }}
              variant="outlined"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(DialogContent);
