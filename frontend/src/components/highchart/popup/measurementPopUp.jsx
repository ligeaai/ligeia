import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import {
  MyTextField,
  MyNumberTextField,
  MyCheckBox,
  Select,
  ColorTextfield,
} from "../..";
import {
  changeValeus,
  cleanStops,
} from "../../../services/actions/overview/overviewDialog";

import TagService from "../../../services/api/tags";
import MyCheckbox from "../../checkbox/checkbox";

const AngularPopUp = (props) => {
  const dispatch = useDispatch();
  const { highchartProps, handleClose } = props;
  const tags = useSelector((state) => state.overviewDialog.measuremenetData);

  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <Grid container rowGap={0.5}>
      <Grid item xs={12}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
      <Grid item xs={12}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Measurement
              </Grid>
              <Grid item xs={12}>
                <Select
                  values={tags}
                  valuesPath="FROM_ITEM_ID"
                  dataTextPath="FROM_ITEM_ID"
                  defaultValue={highchartProps["Measurement"]}
                  handleChangeFunc={async (value) => {
                    handleChangeFunc("Measurement", value);
                    try {
                      const body = JSON.stringify({ TAG_ID: value });
                      let res = await TagService.getTagItem(body);
                      console.log(res);
                      dispatch(
                        changeValeus("Minimum", res.data[0].NORMAL_MINIMUM)
                      );
                      dispatch(
                        changeValeus("Maximum", res.data[0].NORMAL_MAXIMUM)
                      );
                      dispatch(changeValeus("UOM", res.data[0].UOM));
                    } catch (err) {}
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Mesurement Max Age
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Mesurement Max Age"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Mesurement Max Age", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Widget Refresh (seconds)
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Widget Refresh (seconds)"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Widget Refresh (seconds)", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Value Font Size
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Value Font Size"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Value Font Size", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Unit Font Size
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Unit Font Size"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Unit Font Size", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Time Stamp Font Size
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Time Stamp Font Size"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Time Stamp Font Size", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Decimal Places
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Decimal Places"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Decimal Places", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Show Unit
              </Grid>
              <Grid item xs={12}>
                <MyCheckbox
                  defaultValue={highchartProps["Show Unit"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Show Unit", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Show Name
              </Grid>
              <Grid item xs={12}>
                <MyCheckbox
                  defaultValue={!highchartProps["Show Name"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Show Name", !value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Show Chanel
              </Grid>
              <Grid item xs={12}>
                <MyCheckbox
                  defaultValue={highchartProps["Show Chanel"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Show Chanel", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Show Measurement
              </Grid>
              <Grid item xs={12}>
                <MyCheckbox
                  defaultValue={highchartProps["Show Measurement"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Show Measurement", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Show Timestamp
              </Grid>
              <Grid item xs={12}>
                <MyCheckbox
                  defaultValue={highchartProps["Show Timestamp"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Show Timestamp", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AngularPopUp;
