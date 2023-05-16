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
import { fillMandatory } from "../../../services/actions/stepper/stepper";
import "../../../assets/styles/page/overview/popUpLayout.scss";
function MeasuremenCustom() {
  const dispatch = useDispatch();
  const stopsNum = useSelector(
    (state) => state.overviewDialog.highchartProps.Stops
  );
  React.useEffect(() => {
    dispatch(fillMandatory([["Name"], ["Measurement"]]));
  }, []);
  return [
    ["Properties", <CreateWidget enableExport={false} />],
    ["Measurement", <ChoseMeasure />],
    [
      "Stops",
      <>
        <Grid container rowGap={2} className="pop-up-layout-font-size">
          <Grid item xs={12}>
            <Grid container columnSpacing={2}>
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
                      className="overview-number-text-field"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Stops />
        </Grid>
      </>,
    ],
  ];
}

export default MeasuremenCustom;
