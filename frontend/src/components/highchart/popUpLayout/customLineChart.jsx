import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@mui/material";

import { MyNumberTextField, MyCheckBox, ColorTextfield } from "../..";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";

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
  return (
    <Grid container rowGap={2}>
      {Inputs.map((e, i) => (
        <Grid item key={i}>
          <Grid container rowGap={1}>
            <Grid item xs={12} sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {e.NAME}
            </Grid>
            <Grid item xs={12}>
              <Grid container rowGap={0.5} columnGap={2}>
                <Grid item xs={4}>
                  <Grid container rowGap={0.5}>
                    <Grid item xs={12} sx={{ fontSize: "12px" }}>
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
                <Grid item xs={4}>
                  <Grid container rowGap={0.5}>
                    <Grid item xs={12} sx={{ fontSize: "12px" }}>
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
            <MinMaxSelection name={e.NAME} />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
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
        <Grid itme xs={12} sm={6} md={4}>
          <Grid container rowGap={0.5}>
            <Grid item xs={12} sx={{ fontSize: "12px" }}>
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
        <Grid itme xs={12} sm={6} md={4}>
          <Grid container rowGap={0.5}>
            <Grid item xs={12} sx={{ fontSize: "12px" }}>
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

const MyList = () => {
  const dispatch = useDispatch();
  const customColor = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Custom Color"]
  );
  const minMax = useSelector(
    (state) =>
      state.overviewDialog.highchartProps["Show Enable Manuel Y-Axis Min/Max"]
  );

  const alignTicks = useSelector(
    (state) =>
      state.overviewDialog.highchartProps["Show Enable Y-Axis Align Ticks"]
  );
  const startOnTicks = useSelector(
    (state) =>
      state.overviewDialog.highchartProps["Show Enable Y-Axis Start On Ticks"]
  );
  const endOnTicks = useSelector(
    (state) =>
      state.overviewDialog.highchartProps["Show Enable Y-Axis End On Ticks"]
  );

  const values = {
    "Enable Custom Color": customColor,
    "Enable Manuel Y-Axis Min/Max": minMax,
    "Enable Y-Axis Align Ticks": alignTicks,
    "Enable Y-Axis Start On Ticks": startOnTicks,
    "Enable Y-Axis End On Ticks": endOnTicks,
  };
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <List sx={{ width: "100%", bgcolor: "inherit" }}>
      {[
        "Enable Custom Color",
        "Enable Manuel Y-Axis Min/Max",
        "Enable Y-Axis Align Ticks",
        "Enable Y-Axis Start On Ticks",
        "Enable Y-Axis End On Ticks",
      ].map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem key={value} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={() => {
                handleChangeFunc(`Show ${value}`, !values[value]);
              }}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={values[value]}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

const YAxis = () => {
  const Inputs = useSelector(
    (state) => state.overviewDialog.highchartProps.Inputs
  );
  return (
    <Grid container>
      <Grid item xs={7}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12}>
            <ColorPicker />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container rowGap={0.5}>
          <MyList />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default YAxis;
