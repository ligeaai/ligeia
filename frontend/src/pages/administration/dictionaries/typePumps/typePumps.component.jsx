import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {gridSpacing} from "../../../../store/constant";
import styles from "./typePumpsStyle";

const useStyles = makeStyles(styles);

function TypePumps() {
  const classes = useStyles();
  return (
    <Grid container={gridSpacing} className={classes.container}>
      <Typography className={classes.typography}>
        Select type pump to change
      </Typography>
      <Link
        style={{textDecoration: "none"}}
        to="/administration/type-pumps/add"
      >
        <Button className={classes.button}>Add type pump</Button>
      </Link>
    </Grid>
  );
}

export default TypePumps;
