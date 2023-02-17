import React from "react";
import { Grid } from "@mui/material";
import { ItemSperatorLine } from "../../../components";
import { dateFormatDDMMYYHHMM } from "../../../services/utils/dateFormatter";
const alertItem = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <Grid item xs={12} sx={{ px: 2 }}>
        <Grid container rowGap={1}>
          <Grid item xs={12} sx={{ fontSize: "14px", fontWeight: "bold" }}>
            {props.container}
          </Grid>
          <Grid item xs={12} sx={{ fontSize: "12px" }}>
            {props.error_message}
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{ flexDirection: "row-reverse" }}>
              <Grid sx={{ fontSize: "12px" }}>
                {dateFormatDDMMYYHHMM(new Date(props.timestamp * 1000))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ItemSperatorLine />
    </React.Fragment>
  );
};

export default alertItem;
