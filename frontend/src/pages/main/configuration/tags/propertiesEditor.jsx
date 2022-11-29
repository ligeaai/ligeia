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
      width: "100%",
    },
    field: {
      width: "calc(100% - 200px)",
      minWidth: "125px",
    },
    label: {
      width: "180px",
      fontSize: "14px",
      fontFamily: theme.typography.fontFamily,
    },
    labelFields: {
      width: "calc(100% - 200px)",
    },
  };
});

const PropertiesEditor = () => {
  const classes = useStyles();
  const tagValues = useSelector((state) => state.tags.tagValues);
  console.log(tagValues);
  if (Object.keys(tagValues).length > 0) {
    return (
      <Grid container>
        <Grid item xs={12} className={classes.box}>
          {/* <Grid container>
            <LinkSelect />
          </Grid> */}
          <Grid container>
            <Grid item xs={12} sx={{ fontWeight: "bold", mb: 0.5 }}>
              Tag Link
            </Grid>
            <Grid item xs={12} md={6}>
              {Object.keys(tagValues.TAG_LINK).map((e, key) => {
                if (tagValues.TAG_LINK[e].PROPERTY_TYPE !== "GUID") {
                  return (
                    <Grid container className={classes.selectBox} key={key}>
                      <Grid item className={classes.label}>
                        {tagValues.TAG_LINK[e].SHORT_LABEL}
                      </Grid>
                      <Grid item className={classes.labelFields}>
                        <TextFields row={tagValues.TAG_LINK[e]} />
                      </Grid>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.box}>
          <Grid container>
            <Grid item xs={12} sx={{ fontWeight: "bold", mb: 0.5 }}>
              Tag Information
            </Grid>
            <Grid item xs={12} key={"startdatetime"}>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container className={classes.selectBox}>
                    <Grid item className={classes.label}>
                      {tagValues.TAG_INFORMATIONS[0].SHORT_LABEL}
                    </Grid>
                    <Grid item className={classes.field}>
                      <TextFields row={tagValues.TAG_INFORMATIONS[0]} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {Object.keys(tagValues.TAG_INFORMATIONS).map((e, key) => {
              if (
                tagValues.TAG_INFORMATIONS[e].PROPERTY_TYPE !== "GUID" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !==
                  "END_DATETIME" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !==
                  "LAST_UPDT_USER" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !==
                  "LAST_UPDT_DATE" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "LOAD" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "ITEM_ID" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "TARGET_ID" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !==
                  "FULL_INTERVAL" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "ACCESS" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "DESCRIPTION" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "START_DATETIME"
              ) {
                return (
                  <Grid item xs={12} md={6} key={key}>
                    <Grid container className={classes.selectBox}>
                      <Grid item className={classes.label}>
                        {tagValues.TAG_INFORMATIONS[e].SHORT_LABEL}
                      </Grid>
                      <Grid item className={classes.labelFields}>
                        <TextFields row={tagValues.TAG_INFORMATIONS[e]} />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
            })}
            <Grid item xs={12} key={"description"}>
              <Grid container className={classes.selectBox}>
                <Grid item className={classes.label}>
                  {tagValues.TAG_INFORMATIONS[6].SHORT_LABEL}
                </Grid>
                <Grid item className={classes.field}>
                  <TextFields row={tagValues.TAG_INFORMATIONS[6]} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <></>;
  }
};

export default PropertiesEditor;
