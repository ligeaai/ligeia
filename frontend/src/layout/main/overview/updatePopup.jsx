import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";

import { Select, InputGenerator } from "../../../components";
import {
  changeSelectValue,
  changeValeus,
} from "../../../services/actions/overview/overviewDialog";
import { loadSelectItems } from "../../../services/actions/overview/overviewDialog";
import { updateChart } from "../../../services/actions/overview/taps";
import TagService from "../../../services/api/tags";
const MesurementInputGenerator = (props) => {
  const dispatch = useDispatch();
  console.log(props);
  const values = useSelector((state) => state.overviewDialog.measuremenetData);
  console.log(values);
  const handleChangeFunc = async (value) => {
    console.log(value);
    dispatch(changeValeus("Mesurement", value));
    try {
      const body = JSON.stringify({ TAG_ID: value });
      let res = await TagService.getTagItem(body);
      console.log(res);
      dispatch(changeValeus("Minimum", res.data[0].NORMAL_MINIMUM));
      dispatch(changeValeus("Maximum", res.data[0].NORMAL_MAXIMUM));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Select
      {...props}
      values={values}
      //defaultValue={defaultValue}
      valuesPath="FROM_ITEM_ID"
      dataTextPath="FROM_ITEM_ID"
      handleChangeFunc={handleChangeFunc}
    />
  );
};

const DialogContent = ({ highchartProps, chartId, ...rest }) => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.overviewDialog.values);

  React.useEffect(() => {
    async function myFunc() {
      dispatch(await loadSelectItems());
      await dispatch(await changeSelectValue(highchartProps.Type));
      Object.keys(highchartProps).map((e) => {
        dispatch(changeValeus(e, highchartProps[e]));
      });
    }
    myFunc();
  }, []);
  return (
    <Grid container sx={{ p: 1, width: "100%" }}>
      <Typography sx={{ fontWeight: "bold", mb: 1, fontSize: "14px" }}>
        {highchartProps.Type}
      </Typography>
      {properties.map((e, i) => {
        return (
          <Grid container key={i}>
            {e.map((a, key) => {
              return (
                <Grid item xs={6} sm={4} md={3} sx={{ pr: 1, pb: 1 }}>
                  <Grid container>
                    <Grid item xs={12} sx={{ fontSize: "14px" }}>
                      {a.title}
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      {a.title === "Mesurement" ? (
                        <MesurementInputGenerator
                          {...a}
                          defaultValue={highchartProps.Mesurement}
                          changeFunction={changeValeus}
                        />
                      ) : (
                        <InputGenerator {...a} changeFunction={changeValeus} />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Grid container sx={{ flexDirection: "row-reverse" }}>
          <Grid item>
            <Button
              color="error"
              onClick={() => {
                rest.handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(updateChart(chartId));
                rest.handleClose();
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DialogContent;
