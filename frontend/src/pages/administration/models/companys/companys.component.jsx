import {makeStyles} from "@mui/styles";
import styles from "./companysStyles";

import CompanyList from "./companyList/companyList.component";

const useStyles = makeStyles(styles);

export default function Companys() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.table}>
        <CompanyList />
      </div>
    </div>
  );
}
