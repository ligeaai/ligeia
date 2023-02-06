import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import {
  MyTextField,
  MyNumberTextField,
  MyCheckBox,
  ColorTextfield,
} from "../..";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import PopUpItem from "../popUpLayout/popUpItem";

const ColorPicker = () => {
  const dispatch = useDispatch();
  const Inputs = useSelector(
    (state) => state.overviewDialog.highchartProps.Inputs
  );
  const highchartProps = useSelector(
    (state) => state.overviewDialog.highchartProps
  );
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return Inputs.map((e, i) => (
    <Grid container key={i}>
      <Grid item xs={12}>
        Input,{e.NAME}
      </Grid>
      <Grid item xs={12}>
        <Grid container rowGap={0.5}>
          <Grid item>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Color
              </Grid>
              <Grid item xs={12}>
                <ColorTextfield
                  defaultValue={highchartProps[`[${e.NAME}] Color`]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc(`[${e.NAME}] Color`, value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Disable Data Grouping
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={
                    highchartProps[`[${e.NAME}] Disable Data Grouping`]
                  }
                  handleChangeFunc={(value) => {
                    handleChangeFunc(
                      `[${e.NAME}] Disable Data Grouping`,
                      value
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ));
};

const MinMaxSelection = ({ name }) => {
  const dispatch = useDispatch();
  const minimum = useSelector(
    (state) => state.overviewDialog.highchartProps[`${name} Y-Axis Minimum`]
  );
  const maximum = useSelector(
    (state) => state.overviewDialog.highchartProps[`${name} Y-Axis Maximum`]
  );
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <Grid item xs={12}>
      <Grid container rowGap={0.5} columnGap={2}>
        <Grid itme xs={12} sm={6} md={3}>
          <Grid container rowGap={0.5}>
            <Grid item xs={12}>
              Y-Axis Minimum
            </Grid>
            <Grid item xs={12}>
              <MyNumberTextField
                defaultValue={minimum}
                disabled={true}
                handleChangeFunc={(value) => {
                  handleChangeFunc(`${name} Y-Axis Minimum`, value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid itme xs={12} sm={6} md={3}>
          <Grid container rowGap={0.5}>
            <Grid item xs={12}>
              Y-Axis Maximum
            </Grid>
            <Grid item xs={12}>
              <MyNumberTextField
                defaultValue={maximum}
                disabled={true}
                handleChangeFunc={(value) => {
                  handleChangeFunc(`${name} Y-Axis Maximum`, value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const YAxis = () => {
  const dispatch = useDispatch();
  const Inputs = useSelector(
    (state) => state.overviewDialog.highchartProps.Inputs
  );
  const customColor = useSelector(
    (state) => state.overviewDialog.highchartProps["Enable Custom Colors"]
  );
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12}>
            Enable Custom Colors
          </Grid>
          <Grid item xs={12}>
            <MyCheckBox
              defaultValue={customColor}
              handleChangeFunc={(value) => {
                handleChangeFunc("Enable Custom Colors", value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ColorPicker />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container rowGap={0.5}>
          <PopUpItem type="checkbox" title="Enable Manuel Y-Axis Min/Max" />
          <PopUpItem type="checkbox" title="Enable Y-Axis Align Ticks" />
          <PopUpItem type="checkbox" title="Enable Y-Axis Start On Ticks" />
          <PopUpItem type="checkbox" title="Enable Y-Axis End On Ticks" />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {Inputs.map((e, i) => (
          <React.Fragment>
            <Grid item xs={12} key={i}>
              {e.NAME}
            </Grid>
            <MinMaxSelection name={e.NAME} />
          </React.Fragment>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default YAxis;
