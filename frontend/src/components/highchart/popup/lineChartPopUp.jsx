import React from "react";
import { useDispatch } from "react-redux";

import { Grid, Box } from "@mui/material";

import { MyCheckBox } from "../..";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import Inputs from "./inputs";
import ChoseLineMeasure from "../popUpLayout/choseLineMeasue";
import PopUpItem from "../popUpLayout/popUpItem";
import CustomLineChart from "../popUpLayout/customLineChart";

const Linechart = (props) => {
  const dispatch = useDispatch();
  const { highchartProps, handleClose } = props;
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <Grid container rowGap={2} sx={{ div: { fontSize: "14px" } }}>
      <Grid item xs={12}>
        <Grid container columnSpacing={2} columns={24}>
          <PopUpItem type="text" title="Name" />
          <PopUpItem type="number" title="Name Font Size(em)" />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={2} columns={24}>
          <PopUpItem type="number" title="Refresh (seconds)" />
          <PopUpItem type="number" title="X-Axis Duration (minutes)" />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Enable X-Axis Reset
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable X-Axis Reset"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable X-Axis Reset", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Enable Header Buttons
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Header Buttons"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Header Buttons", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Enable Title
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Title"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Title", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Enable Navbar
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Navbar"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Navbar", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Enable Export
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Show Enable Export"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Show Enable Export", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Enable Range Selector
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Range Selector"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Range Selector", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Enable Graph Legend
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Graph Legend"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Graph Legend", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={2} columns={24}>
          <PopUpItem type="number" title="Graph Axis Value Font Size (em)" />
          <PopUpItem type="number" title="Graph Axis Title Font Size (em)" />
          <PopUpItem type="number" title="Graph Legend Font Size (em)" />
          <PopUpItem type="number" title="Graph Title Font Size (em)" />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container rowGap={0.5}>
          <ChoseLineMeasure />
          <Box sx={{ my: 1 }}>Inputs</Box>
          <Grid item xs={12}>
            <Inputs
              handleChangeFunc={(value) => {
                handleChangeFunc("Inputs", value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <CustomLineChart />
    </Grid>
  );
};

export default Linechart;
