import React from "react";
import { useDispatch } from "react-redux";

import { Grid, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import Inputs from "./inputs";
import ChoseLineMeasure from "../popUpLayout/choseLineMeasue";
import PopUpItem from "../popUpLayout/popUpItem";
import CustomLineChart from "../popUpLayout/customLineChart";

const Linechart = ({ handleClose, title }) => {
  const dispatch = useDispatch();
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  let anchorStyle = {
    textDecoration: "none",
    color: "#ffffff",
  };
  return (
    <>
      <Typography
        id="draggable-dialog-title"
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          width: "100%",
          cursor: "all-scroll",
          backgroundColor: "background.main",
          height: "44px",
          top: 0,
          px: 2,
          position: "sticky",
          zIndex: 2,
        }}
      >
        <Grid
          container
          sx={{
            height: "44px",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid item sx={{ alignSelf: "center" }}>
            <a href="#CreateWidget" style={{ ...anchorStyle }}>
              {title}
            </a>
          </Grid>
          <Grid item sx={{ alignSelf: "center" }}>
            <a href="#CreateWidget" style={{ ...anchorStyle }}>
              Create Widget
            </a>
          </Grid>
          <Grid item sx={{ alignSelf: "center" }}>
            <a href="#ChoseMeasurement" style={{ ...anchorStyle }}>
              Chose Measurement
            </a>
          </Grid>
          <Grid item sx={{ alignSelf: "center" }}>
            <a href="#ChoseInput" style={{ ...anchorStyle }}>
              Chose Input
            </a>
          </Grid>
          <Grid item sx={{ alignSelf: "center" }}>
            <a href="#Settings" style={{ ...anchorStyle }}>
              Settings
            </a>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Typography>
      <Grid
        container
        rowGap={2}
        sx={{
          div: { fontSize: "14px" },
          p: 2,
          overflowY: "auto",
          maxHeight: "700px",
        }}
      >
        <Typography id={"CreateWidget"}>Create Widget</Typography>
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
          <Grid container rowGap={0.5} columns={24}>
            <PopUpItem type="checkbox" title="Show Enable X-Axis Reset" />
            <PopUpItem type="checkbox" title="Show Enable Header Buttons" />
            <PopUpItem type="checkbox" title="Show Enable Title" />
            <PopUpItem type="checkbox" title="Show Enable Navbar" />
            <PopUpItem type="checkbox" title="Show Enable Export" />
            <PopUpItem type="checkbox" title="Show Enable Range Selector" />
            <PopUpItem type="checkbox" title="Show Enable Graph Legend" />
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
            <Typography id={"ChoseMeasurement"}>Chose Measurement</Typography>
            <ChoseLineMeasure />
            <Typography id={"ChoseInput"} sx={{ width: "100%" }}>
              Chose Input
            </Typography>
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
        <Typography id={"Settings"}>Settings</Typography>
        <CustomLineChart />
      </Grid>
    </>
  );
};

export default Linechart;
