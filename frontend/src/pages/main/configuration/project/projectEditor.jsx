import React from "react";

import Grid from "@mui/material/Grid";

import { MyBox, MyCheckBox, MyTextField, Select } from "../../../../components";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  selectBox: {
    alignItems: "center",
  },
  label: {
    width: "180px",
  },
  textfield: {
    fontSize: "14px",
    "& .MuiOutlinedInput-input": { paddingTop: "4px", paddingBottom: "4px" },
    width: 120,
  },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container className={classes.selectBox}>
          <Grid item className={classes.label}>
            Data source:
          </Grid>
          <Grid item>
            <Select />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.selectBox}>
          <Grid item className={classes.label}>
            Azure edition:
          </Grid>
          <Grid item>
            <MyCheckBox />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.selectBox}>
          <Grid item className={classes.label}>
            Connection String
          </Grid>
          <Grid item>
            <MyTextField />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.selectBox}>
          <Grid item className={classes.label}>
            Database creation File
          </Grid>
          <Grid item>
            <MyTextField />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.selectBox}>
          <Grid item className={classes.label}>
            Enable Azure Blobs
          </Grid>
          <Grid item>
            <MyCheckBox />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const projectEditor = () => {
  return <MyBox Element={<Main />} />;
};

export default projectEditor;
