import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {gridSpacing} from "../../../../store/constant";
import styles from "./typeStatusStyle";

const useStyles = makeStyles(styles);

function TypeStatus() {
  const classes = useStyles();
  return (
    <Grid container={gridSpacing} className={classes.container}>
      <Typography className={classes.typography}>
        Select type status to change
      </Typography>
      <Link
        style={{textDecoration: "none"}}
        to="/administration/type-status/add"
      >
        <Button className={classes.button}>Add type status</Button>
      </Link>
    </Grid>
  );
}

export default TypeStatus;
