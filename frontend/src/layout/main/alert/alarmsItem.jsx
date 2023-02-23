import React, { useState } from "react";
import { Divider, Grid } from "@mui/material";
import { ItemSperatorLineXL } from "../../../components";
import { dateFormatDDMMYYHHMM } from "../../../services/utils/dateFormatter";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
const alarmLevel = {
  1: "Error",
  2: "Warning",
  3: "Info",
};

const AlertItem = (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar(
      <Grid container rowSpacing={2} sx={{ width: "400px" }}>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Grid container alignItems={"center"} justifyContent="space-between">
            <Grid item>{props.layer_name}</Grid>
          </Grid>
        </Grid>
        <ItemSperatorLineXL />
        <Grid item xs={12}>
          {typeof props.error_message === "string" ? (
            props.error_message
          ) : (
            <Grid container>
              <Grid item xs={12} sx={{ fontSize: "14px", fontWeight: "bold" }}>
                Error Message
              </Grid>
              {Object.keys(props.error_message).map((e, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    {e}:{props.error_message[e]}
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          {dateFormatDDMMYYHHMM(new Date(props.timestamp * 1000))}
        </Grid>
      </Grid>,
      {
        variant: alarmLevel[props.priority],
        action: (key) => (
          <Grid item sx={{ position: "absolute", top: 4, right: 4 }}>
            <IconButton onClick={() => closeSnackbar(key)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        ),
      }
    );
  };

  React.useEffect(() => {
    handleClick();
  }, []);
  // return (
  //   <Snackbar open={true}>
  //     <Alert severity={"info"} sx={{ width: "100%" }}>
  //       sadkasdlş
  //     </Alert>
  //   </Snackbar>
  // );
  // return (
  //   <React.Fragment>
  //     <Grid item xs={12} sx={{ px: 2, zIndex: 5 }}>
  //       <Grid container rowGap={1}>
  //         <Grid item xs={12} sx={{ fontSize: "14px", fontWeight: "bold" }}>
  //           {props.container}
  //         </Grid>
  //         <Grid item xs={12} sx={{ fontSize: "12px" }}>
  // {
  //   typeof props.error_message === "string" ? (
  //     props.error_message
  //   ) : (
  //     <Grid container>
  //       <Grid item xs={12} sx={{ fontSize: "14px", fontWeight: "bold" }}>
  //         Error Message
  //       </Grid>
  //       {Object.keys(props.error_message).map((e, i) => {
  //         return (
  //           <Grid item xs={12} key={i}>
  //             {e}:{props.error_message[e]}
  //           </Grid>
  //         );
  //       })}
  //     </Grid>
  //   );
  // }
  //         </Grid>
  //         <Grid item xs={12}>
  //           <Grid container sx={{ flexDirection: "row-reverse" }}>
  //             <Grid sx={{ fontSize: "12px" }}>
  //               {dateFormatDDMMYYHHMM(new Date(props.timestamp * 1000))}
  //             </Grid>
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //     <ItemSperatorLine />
  //   </React.Fragment>
  // );
};

export default AlertItem;
