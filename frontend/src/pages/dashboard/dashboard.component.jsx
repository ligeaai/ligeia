<<<<<<< HEAD
import {makeStyles} from "@mui/styles";
import styles from "./dashboardStyle";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return <div className={classes.wrapper}>Asdsad</div>;
}
=======
import {makeStyles} from "@mui/styles";
import styles from "./dashboardStyle";


const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      Monitoring
    </div>
  );
}
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
