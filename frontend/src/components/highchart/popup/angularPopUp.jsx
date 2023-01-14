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

const Measurement = () => {
  const dispatch = useDispatch();
  const minimum = useSelector(
    (state) => state.overviewDialog.highchartProps.Minimum
  );
  const maximum = useSelector(
    (state) => state.overviewDialog.highchartProps.Maximum
  );
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4.5}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12}>
            Minimum
          </Grid>
          <Grid item xs={12}>
            <MyNumberTextField
              defaultValue={minimum}
              handleChangeFunc={(value) => {
                handleChangeFunc("Minimum", value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4.5}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12}>
            Maximum
          </Grid>
          <Grid item xs={12}>
            <MyNumberTextField
              defaultValue={maximum}
              handleChangeFunc={(value) => {
                handleChangeFunc("Maximum", value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const AngularPopUp = (props) => {
  const dispatch = useDispatch();
  const { highchartProps, handleClose } = props;
  const tags = useSelector((state) => state.overviewDialog.measuremenetData);
  const UOMList = useSelector((state) => state.tapsOverview.UOMList);
  const uom = useSelector((state) => state.overviewDialog.highchartProps.UOM);
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
    <Grid
      container
      columnSpacing={2}
      rowGap={2}
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
              <Grid item xs={12} sm={6}>
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
            <Grid container columnSpacing={2} rowGap={2}>
              <Grid item xs={12} sm={6}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    Measurement
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      values={tags}
                      valuesPath="TAG_ID"
                      dataTextPath="NAME"
                      defaultValue={highchartProps["Measurement"]}
                      handleChangeFunc={async (value) => {
                        handleChangeFunc("Measurement", value);
                        handleChangeFunc(
                          "Minimum",
                          tags.filter((e) => e.TAG_ID === value)[0]
                            .NORMAL_MINIMUM
                        );
                        handleChangeFunc(
                          "Maximum",
                          tags.filter((e) => e.TAG_ID === value)[0]
                            .NORMAL_MAXIMUM
                        );
                        handleChangeFunc(
                          "UOM",
                          tags.filter((e) => e.TAG_ID === value)[0].UOM
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    Unit of Measurement
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      values={uom ? [uom] : []}
                      defaultValue={uom ? uom : ""}
                      disabled={true}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    Tag Name Font Size
                  </Grid>
                  <Grid item xs={12}>
                    <MyNumberTextField
                      defaultValue={highchartProps["Tag Name Font Size"]}
                      handleChangeFunc={(value) => {
                        handleChangeFunc("Tag Name Font Size", value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6} md={3}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Stops
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Stops"]}
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
          <Stops />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AngularPopUp;
