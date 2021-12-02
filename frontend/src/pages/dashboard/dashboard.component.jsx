import React from "react";
import {makeStyles} from "@mui/styles";
import {CssBaseline} from "@mui/material";
import {Typography} from "@mui/material";
import styles from "./dashboardStyle";
import EquipmentCard from "../../components/equipmentCard/equipmentCard.component";

const useStyles = makeStyles(styles);

const cards = [{id: 1, name: "SM 1281"}];

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {/* {cards.map((equipmentCardInfo, index) => (
        <EquipmentCard equipmentCardInfo={equipmentCardInfo} />
      ))} */}
      Monitoring
    </div>
  );
}
