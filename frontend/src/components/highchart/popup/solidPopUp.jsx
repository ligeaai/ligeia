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
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MyNumberTextField, ColorTextfield } from "../..";
import {
  changeValeus,
  cleanStops,
} from "../../../services/actions/overview/overviewDialog";

import ChoseMeasure from "../popUpLayout/choseMeasure";
import PopUpItem from "../popUpLayout/popUpItem";
import Measurement from "../popUpLayout/measurement";
const Stops = () => {
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
              <Grid item xs={12} sm={6} md={3}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    {`[${e}] Stops`}
                  </Grid>
                  <Grid item xs={12}>
                    <MyNumberTextField
                      defaultValue={highchartProps[`[${e}] Stops`]}
                      handleChangeFunc={(value) => {
                        handleChangeFunc(`[${e}] Stops`, value);
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

const SolidPopUp = ({ handleClose, title }) => {
  const dispatch = useDispatch();
  const stops = useSelector(
    (state) => state.overviewDialog.highchartProps["Stops"]
  );
  const Name = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Name"]
  );
  const Measurements = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Measurement"]
  );
  const Unit = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Unit"]
  );
  const TagName = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Tag Name"]
  );
  const TimeStamp = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Timestamp"]
  );
  const EnableExport = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Export"]
  );
  let anchorStyle = {
    textDecoration: "none",
    color: "#ffffff",
  };
  const values = {
    Name: Name,
    Measurement: Measurements,
    Unit: Unit,
    "Tag Name": TagName,
    Timestamp: TimeStamp,
    "Enable Export": EnableExport,
  };
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
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
            <a href="#Stops" style={{ ...anchorStyle }}>
              Stops
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
        columnSpacing={2}
        rowGap={2}
        sx={{
          div: { fontSize: "14px" },
          p: 2,
          overflowY: "auto",
          height: "700px",
        }}
      >
        <Grid item xs={12} sm={9}>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <Grid container columnSpacing={2} rowGap={2}>
                <PopUpItem type="text" title="Name" />
                <PopUpItem type="number" title="Name Font Size(em)" />
                <PopUpItem type="number" title="Widget Refresh (seconds)" />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container columnSpacing={2} rowGap={2}>
                <Grid item xs={12}>
                  <ChoseMeasure />
                </Grid>
                <PopUpItem type="number" title="Value Font Size" />
                <PopUpItem type="number" title="Unit Font Size" />
                <PopUpItem type="number" title="Tag Name Font Size" />
                <PopUpItem type="number" title="Time Stamp Font Size" />
                <PopUpItem type="number" title="Decimal Places" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Grid container>
            <Grid item xs={12}>
              <List sx={{ width: "100%", bgcolor: "inherit" }}>
                {[
                  "Name",
                  "Measurement",
                  "Unit",
                  "Enable Export",
                  "Timestamp",
                  "Tag Name",
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
                            checked={
                              value === "Name" ? !values[value] : values[value]
                            }
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container rowGap={2} columnSpacing={2}>
            <Measurement />
            <Grid item xs={12} sm={6} md={2}>
              <Grid container rowGap={0.5}>
                <Grid item xs={12}>
                  Stops
                </Grid>
                <Grid item xs={12}>
                  <MyNumberTextField
                    defaultValue={stops}
                    handleChangeFunc={(value) => {
                      dispatch(
                        cleanStops("Stops", value, ["Low", "High", "Color"])
                      );
                    }}
                    sx={{
                      fontSize: "14px",
                      "& .MuiOutlinedInput-input": {
                        fontSize: "14px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        paddingRight: "2px",
                      },
                      width: 75,
                      minWidth: 75,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stops />
        </Grid>
      </Grid>
    </>
  );
};

export default SolidPopUp;
