import React from "react";
import { Grid } from "@mui/material";
import { ItemSperatorLine } from "../../../components";
import { dateFormatDDMMYYHHMM } from "../../../services/utils/dateFormatter";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarProvider, useSnackbar } from "notistack";
const AlertItem = (props) => {
  console.log(props);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar(
      <Grid container>
        <Grid item xs={12}>
          {props.layer_name}
        </Grid>
        <Grid item xs={12}>
          {props.error_message}
        </Grid>
        <Grid item xs={12}>
          {dateFormatDDMMYYHHMM(new Date(props.timestamp * 1000))}
        </Grid>
      </Grid>,
      {
        variant: props.LOG_TYPE,
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
  //           {typeof props.error_message === "string" ? (
  //             props.error_message
  //           ) : (
  //             <Grid container>
  //               <Grid
  //                 item
  //                 xs={12}
  //                 sx={{ fontSize: "14px", fontWeight: "bold" }}
  //               >
  //                 Error Message
  //               </Grid>
  //               {Object.keys(props.error_message).map((e, i) => {
  //                 return (
  //                   <Grid item xs={12} key={i}>
  //                     {e}:{props.error_message[e]}
  //                   </Grid>
  //                 );
  //               })}
  //             </Grid>
  //           )}
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
