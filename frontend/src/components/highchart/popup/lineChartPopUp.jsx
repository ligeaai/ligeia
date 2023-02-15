import React from "react";
import { useDispatch } from "react-redux";

import { Grid, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import Inputs from "./inputs";
import PopUpItem from "../popUpLayout/popUpItem";
import CustomLineChart from "../popUpLayout/customLineChart";
import CreateLineWidget from "../popUpLayout/createLineWidget";
import LineAssets from "../popUpLayout/lineAssets";
const Linechart = ({ handleClose, title }) => {
  const dispatch = useDispatch();
  const [selectedWidget, setSelectedWidget] = React.useState("Properties");
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
            sx={{ alignSelf: "center", color: "text.blue" }}
            onClick={handeleOnClick("Properties")}
          >
            {title}
          </Grid>
          {["Properties", "Assets", "Measurements", "Settings"].map((e) => (
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
        {selectedWidget === "Properties" ? (
          <>
            <Typography>Properties</Typography>
            <Grid item xs={12}>
              <CreateLineWidget />
            </Grid>
          </>
        ) : (
          <></>
        )}
        {selectedWidget === "Assets" ? (
          <>
            <Typography>Assets</Typography>

            <Grid item xs={12}>
              <LineAssets
                handleChangeFunc={(value) => {
                  handleChangeFunc("Transaction Property", value);
                }}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}
        {selectedWidget === "Measurements" ? (
          <>
            <Typography sx={{ width: "100%" }}>Measurements</Typography>
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
            <Typography>Settings</Typography>
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
