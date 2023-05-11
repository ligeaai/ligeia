import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Grid } from "@mui/material";

import { MyTextField, Select } from "../../../../components";
import { updateData } from "../../../../services/actions/workflow/workflow";

import TypeService from "../../../../services/api/type";

const PickType = ({ defaultValue }) => {
  const dispatch = useDispatch();
  const CULTURE = useSelector((state) => state.lang.cultur);
  const [values, setValues] = React.useState();
  React.useEffect(() => {
    async function myFunc() {
      const body = JSON.stringify({ CULTURE });
      let res = await TypeService.workflow(body);
      setValues(res.data);
    }
    myFunc();
  }, []);
  return (
    <Grid container className="workflow-container__body__step-one__input-box">
      <Grid item xs={3}>
        <label className="workflow-container__body__step-one__input-box__label">
          Type
        </label>
      </Grid>
      <Grid item xs={9}>
        <Select
          values={values}
          defaultValue={defaultValue}
          valuesPath="TYPE"
          dataTextPath="SHORT_LABEL"
          handleChangeFunc={(value) => {
            dispatch(updateData("TYPE", value));
          }}
        />
      </Grid>
    </Grid>
  );
};

const StepperOne = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.workflow?.data);
  return (
    <React.Fragment>
      <Grid container className="workflow-container__body__step-one__input-box">
        <Grid item xs={3}>
          <label className="workflow-container__body__step-one__input-box__label">
            Name
          </label>
        </Grid>
        <Grid item xs={9}>
          <MyTextField
            defaultValue={data?.NAME}
            handleChangeFunc={(value) => {
              dispatch(updateData("NAME", value));
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container className="workflow-container__body__step-one__input-box">
        <Grid item xs={3}>
          <label className="workflow-container__body__step-one__input-box__label">
            Workflow
          </label>
        </Grid>
        <Grid item xs={9}>
          <Select
            values={[
              "Spectral Analysis",
              "Failover Predicition",
              "Pump Optimization",
              "Compressor Optimization",
              "Flotation Optimization",
              "Grinding Optimization",
            ]}
            defaultValue={data?.CODE}
            handleChangeFunc={(value) => {
              dispatch(updateData("CODE", value));
            }}
          />
        </Grid>
      </Grid>
      <br />
      <PickType defaultValue={data?.TYPE} />
    </React.Fragment>
  );
};

export default StepperOne;
