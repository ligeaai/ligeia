import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import { MyNumberTextField, ColorTextfield } from "../..";
import {
  changeValeus,
  cleanStops,
} from "../../../services/actions/overview/overviewDialog";
import CreateWidget from "../popUpLayout/createWidget";
import ChoseMeasure from "../popUpLayout/choseMeasure";
import { Stops } from "../popUpLayout/stops";
import Measurement from "../popUpLayout/measurement";

function MeasuremenCustom() {
  const dispatch = useDispatch();
  const stopsNum = useSelector(
    (state) => state.overviewDialog.highchartProps.Stops
  );
  return [
    ["Create Widget", <CreateWidget />],
    ["Chose Measurement", <ChoseMeasure />],
    [
      "Stops",
      <>
        <Grid
          container
          columnSpacing={2}
          rowGap={2}
          sx={{ div: { fontSize: "14px" } }}
        >
          <Measurement />
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Stops
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={stopsNum}
                  handleChangeFunc={(value) => {
                    dispatch(
                      cleanStops("Stops", value, ["Low", "High", "Color"])
                    );
                  }}
                  sx={{
                    fontSize: "14px",
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingRight: "2px",
                    },
                    width: 75,
                    minWidth: 75,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Stops />
      </>,
    ],
  ];
}

export default MeasuremenCustom;
