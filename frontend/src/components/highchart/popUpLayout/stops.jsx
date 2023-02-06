import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import { changeValeus } from "../../../services/actions/overview/overviewDialog";

import MyNumberTextField from "../../textfield/numberTextField";
import ColorTextfield from "../../textfield/colortextfield";
export const Stops = () => {
  const dispatch = useDispatch();
  const highchartProps = useSelector(
    (state) => state.overviewDialog.highchartProps
  );
  var loop = [];
  for (let i = 0; i < highchartProps.Stops; i++) {
    loop.push(i);
  }
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <React.Fragment>
      {loop.map((e, i) => {
        return (
          <Grid item xs={12} key={i}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6} md={4.5}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    {`[${e}] Low`}
                  </Grid>
                  <Grid item xs={12}>
                    <MyNumberTextField
                      defaultValue={highchartProps[`[${e}] Low`]}
                      handleChangeFunc={(value) => {
                        handleChangeFunc(`[${e}] Low`, value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={4.5}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    {`[${e}] High`}
                  </Grid>
                  <Grid item xs={12}>
                    <MyNumberTextField
                      defaultValue={highchartProps[`[${e}] High`]}
                      handleChangeFunc={(value) => {
                        handleChangeFunc(`[${e}] High`, value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    {`[${e}] Color`}
                  </Grid>
                  <Grid item xs={12}>
                    <ColorTextfield
                      defaultValue={highchartProps[`[${e}] Color`]}
                      handleChangeFunc={(value) => {
                        handleChangeFunc(`[${e}] Color`, value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};
