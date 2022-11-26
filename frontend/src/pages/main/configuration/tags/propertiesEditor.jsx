import React from "react";
import Grid from "@mui/material/Grid";

import { makeStyles } from "@mui/styles";
import { Select } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";

import TextFields from "./textfields";
import { instance, config } from "../../../../services/baseApi";
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
      marginBottom: "4px",
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

const PropertiesEditor = () => {
  const classes = useStyles();
  const tagValues = useSelector((state) => state.tags.tagValues);

  if (tagValues.length > 0) {
    return (
      <Grid container>
        <Grid item xs={12} className={classes.box}>
          {/* <Grid container>
            <LinkSelect />
          </Grid> */}
          <Grid container>
            <Grid item xs={12} sx={{ fontWeight: "bold" }}>
              Tag Information
            </Grid>

            {Object.keys(tagValues).map((e, key) => {
              if (
                tagValues.length > 0 &&
                tagValues[e].PROPERTY_TYPE !== "GUID"
              ) {
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
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <></>;
  }
};

export default PropertiesEditor;
