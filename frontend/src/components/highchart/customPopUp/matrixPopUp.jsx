import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import { MyTextField, MyNumberTextField } from "../..";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";

const MatrixPopup = (props) => {
  const dispatch = useDispatch();
  const { highchartProps, handleClose } = props;

  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <Grid
      container
      rowGap={2}
      columnSpacing={2}
      sx={{ div: { fontSize: "14px" } }}
    >
      <Grid item xs={12} sm={9}>
        <Grid container rowGap={2}>
          <Grid item xs={12}>
            <Grid container columnSpacing={2} rowGap={2}>
              <Grid item xs={12} sm={6}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    Name
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField
                      defaultValue={highchartProps.Name}
                      handleChangeFunc={(value) => {
                        handleChangeFunc("Name", value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    Name Font Size(em)
                  </Grid>
                  <Grid item xs={12}>
                    <MyNumberTextField
                      defaultValue={highchartProps["Name Font Size(em)"]}
                      handleChangeFunc={(value) => {
                        handleChangeFunc("Name Font Size(em)", value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MatrixPopup;
