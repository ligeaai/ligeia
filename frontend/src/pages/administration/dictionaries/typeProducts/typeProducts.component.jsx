import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {gridSpacing} from "../../../../store/constant";
import styles from "./typeProductsStyle";

const useStyles = makeStyles(styles);

function TypeProducts() {
  const classes = useStyles();
  return (
    <Grid container={gridSpacing} className={classes.container}>
      <Typography className={classes.typography}>
        Select type product to change
      </Typography>
      <Link
        style={{textDecoration: "none"}}
        to="/administration/type-products/add"
      >
        <Button className={classes.button}>Add type product</Button>
      </Link>
    </Grid>
  );
}

export default TypeProducts;
