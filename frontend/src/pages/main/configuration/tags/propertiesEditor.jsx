import React, { Suspense } from "react";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

import {
  Select,
  DatePicker,
  MyTextField,
  MyCheckBox,
  MyNumberTextField,
} from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { addSaveTagValue } from "../../../../services/actions/tags/tags";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    box: {
      boxShadow: theme.shadows[1],
      padding: "8px",
      borderRadius: "3px",
      margin: "8px",
    },
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
  };
});

const TextFields = (props) => {
  const dispatch = useDispatch();
  const { row } = props;
  const codeHandleChangeFunc = (value) => {
    dispatch(addSaveTagValue(row.PROPERTY_NAME, value.ROW_ID));
  };
  const dateHandleChangeFunc = (value) => {
    dispatch(addSaveTagValue(row.PROPERTY_NAME, value));
  };
  const textHandleChangeFunc = (value) => {
    dispatch(addSaveTagValue(row.PROPERTY_NAME, value));
  };
  const boolHandleChangeFunc = (value) => {
    dispatch(addSaveTagValue(row.PROPERTY_NAME, value));
  };
  if (row.PROPERTY_TYPE === "CODE") {
    return (
      <Select
        values={row.CODE}
        dataTextPath="CODE_TEXT"
        handleChangeFunc={codeHandleChangeFunc}
      />
    );
  }
  if (row.PROPERTY_TYPE === "DATETIME") {
    return <DatePicker time={new Date()} onChangeFunc={dateHandleChangeFunc} />;
  }
  if (row.PROPERTY_TYPE === "TEXT") {
    return <MyTextField handleChangeFunc={textHandleChangeFunc} />;
  }
  if (row.PROPERTY_TYPE === "BOOL") {
    return <MyCheckBox handleChangeFunc={boolHandleChangeFunc} />;
  }
  if (row.PROPERTY_TYPE === "NUMBER") {
    return <MyNumberTextField handleChangeFunc={boolHandleChangeFunc} />;
  }
  // if (row.PROPERTY_TYPE === "ITEM") {
  //   return <MyCheckBox handleChangeFunc={boolHandleChangeFunc} />;
  // }
  return <>as</>;
};

const PropertiesEditor = () => {
  const classes = useStyles();
  const tagValues = useSelector((state) => state.tags.tagValues);
  return (
    <Grid container>
      <Grid item xs={12} className={classes.box}>
        <Grid container>
          <Grid item xs={12} sx={{ fontWeight: "bold" }}>
            Transform Information
          </Grid>

          {Object.keys(tagValues).map((e, key) => {
            if (tagValues.length > 0 && tagValues[e].PROPERTY_TYPE !== "GUID") {
              return (
                <Grid item xs={12} key={key}>
                  <Grid container className={classes.selectBox}>
                    <Grid item className={classes.label}>
                      {tagValues[e].SHORT_LABEL}
                    </Grid>
                    <Grid item>
                      <TextFields row={tagValues[e]} />
                    </Grid>
                  </Grid>
                </Grid>
              );
            }
          })}

          {/* <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Transaction type
              </Grid>
              <Grid item>
                <Select />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Transaction property
              </Grid>
              <Grid item>
                <Select />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Default key value 1
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Default key value 2
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Default key value 3
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Name
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Transaction type
              </Grid>
              <Grid item>
                <Select />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Time Offset
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Event agregation interval
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.box}>
        asd
      </Grid>
    </Grid>
  );
};

export default PropertiesEditor;
