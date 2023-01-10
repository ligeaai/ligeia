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
              <Grid item xs={12} sm={6} md={3}>
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
      <Grid item xs={12} sm={6} md={3}>
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
      <Grid item xs={12} sm={6} md={3}>
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

  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <Grid container rowGap={2}>
      <Grid item xs={12}>
        <Grid container columnSpacing={2}>
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
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6} md={3}>
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
                      tags.filter((e) => e.TAG_ID === value)[0].NORMAL_MINIMUM
                    );
                    handleChangeFunc(
                      "Maximum",
                      tags.filter((e) => e.TAG_ID === value)[0].NORMAL_MAXIMUM
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
        <Grid container columnSpacing={2}>
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
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container columnSpacing={2} rowGap={2}>
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
      <Stops />
    </Grid>
  );
};

export default AngularPopUp;
