import {Button, Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Typography} from "@mui/material";
import {gridSpacing} from "../../../../store/constant";
import styles from "./companysStyles";
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Companys() {
  const classes = useStyles();
  return (
    <Grid container={gridSpacing} className={classes.container}>
      <Typography className={classes.typography}>
        Select company to change
      </Typography>
      <Link style={{textDecoration: "none"}} to="/administration/companys/add">
        <Button className={classes.button}>Add company</Button>
      </Link>
    </Grid>
  );
}
