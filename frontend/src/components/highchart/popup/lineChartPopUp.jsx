import React from "react";
import { useDispatch } from "react-redux";

import { Grid, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import Inputs from "./inputs";
import ChoseLineMeasure from "../popUpLayout/choseLineMeasue";
import PopUpItem from "../popUpLayout/popUpItem";
import CustomLineChart from "../popUpLayout/customLineChart";
import CreateLineWidget from "../popUpLayout/createLineWidget";
const Linechart = ({ handleClose, title }) => {
  const dispatch = useDispatch();
  const [selectedWidget, setSelectedWidget] = React.useState("Create Widget");
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  const handeleOnClick = (a) => () => {
    setSelectedWidget(a);
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
          <Grid
            item
            sx={{ alignSelf: "center" }}
            onClick={handeleOnClick("Create Widget")}
          >
            {title}
          </Grid>
          {[
            "Create Widget",
            "Chose Measurement",
            "Chose Input",
            "Settings",
          ].map((e) => (
            <Grid
              item
              sx={{ alignSelf: "center", cursor: "pointer" }}
              onClick={handeleOnClick(e)}
            >
              {e}
            </Grid>
          ))}

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
          height: "700px",
          alignContent: "flex-start",
        }}
      >
        {selectedWidget === "Create Widget" ? (
          <>
            <Typography id={"CreateWidget"}>Create Widget</Typography>
            <Grid item xs={12}>
              <CreateLineWidget />
            </Grid>
          </>
        ) : (
          <></>
        )}
        {selectedWidget === "Chose Measurement" ? (
          <>
            <Typography id={"ChoseMeasurement"}>Chose Measurement</Typography>

            <Grid item xs={12}>
              <ChoseLineMeasure />
            </Grid>
          </>
        ) : (
          <></>
        )}
        {selectedWidget === "Chose Input" ? (
          <>
            <Typography id={"ChoseInput"} sx={{ width: "100%" }}>
              Chose Input
            </Typography>
            <Grid item xs={12}>
              <Inputs
                handleChangeFunc={(value) => {
                  handleChangeFunc("Inputs", value);
                }}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}
        {selectedWidget === "Settings" ? (
          <>
            <Typography id={"Settings"}>Settings</Typography>
            <Grid item>
              <CustomLineChart />
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};

export default Linechart;
