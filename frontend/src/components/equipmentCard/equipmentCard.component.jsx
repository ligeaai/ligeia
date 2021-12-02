import React from "react";
import {makeStyles} from "@mui/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./equipmentCardStyle";

const cards = [{id: 1, name: "SM 1281"}];
const name = cards.map((name) => <h5>{name}</h5>);

const useStyles = makeStyles(styles);

function EquipmentCard(props) {
  const classes = useStyles();
  const {equipmentCardInfo} = props;
  return (
    <Box className={classes.box}>
      <Card className={classes.card}>
        <div className={classes.equipmentName}>
          <Typography>{equipmentCardInfo.name}</Typography>
        </div>
        <CardContent>
          <div>
            <Box className={classes.channelItem}>
              <Typography>Channel 1</Typography>
              <CircleIcon
                style={{
                  color: "#7CD07C",
                  border: "1px solid #000000",
                  borderRadius: "100px",
                  boxSizing: "border-box",
                }}
              />
            </Box>

            <Box className={classes.channelItem}>
              <Typography>Channel 2</Typography>
              <CircleOutlinedIcon />
            </Box>
            <Box className={classes.channelItem}>
              <Typography>Channel 3</Typography>
              <CircleOutlinedIcon />
            </Box>
            <Box className={classes.channelItem}>
              <Typography>Channel 4</Typography>
              <CircleOutlinedIcon />
            </Box>
          </div>
        </CardContent>
        <CardActions></CardActions>
      </Card>
      
      <Card className={classes.card}>
        <div className={classes.equipmentName}>
          <Typography>{equipmentCardInfo.name}</Typography>
        </div>
        <CardContent>
          <div>
            <Box className={classes.channelItem}>
              <Typography>Channel 1</Typography>
              <CircleIcon
                style={{
                  color: "#7CD07C",
                  border: "1px solid #000000",
                  borderRadius: "100px",
                  boxSizing: "border-box",
                }}
              />
            </Box>
            <Box className={classes.channelItem}>
              <Typography>Channel 2</Typography>
              <CircleOutlinedIcon />
            </Box>
            <Box className={classes.channelItem}>
              <Typography>Channel 3</Typography>
              <CircleOutlinedIcon />
            </Box>
            <Box className={classes.channelItem}>
              <Typography>Channel 4</Typography>
              <CircleOutlinedIcon />
            </Box>
          </div>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
}

export default EquipmentCard;
