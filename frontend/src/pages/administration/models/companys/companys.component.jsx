import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";
import styles from "./companysStyles";

import CompanyList from "./companyList/companyList.component";
import {Typography} from "@mui/material";

const useStyles = makeStyles(styles);

export default function Companys() {
  const classes = useStyles();
  // const [companies, setCompanies] = useState([]);

  // const webApiUrl = "http://192.168.1.104:8000/api/v1/companies/";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const {data: response} = await axios.get(webApiUrl, {
  //         headers: {
  //           Authorization: "Token 322ba55f7d3d3f8bf5d6186129f6863c559bedfa",
  //         },
  //       });
  //       setCompanies(response);
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className={classes.container}>
      <div className={classes.actions}>
        <Typography variant="h4" className={classes.typography}>
          Select company to change
        </Typography>
        <Link
          style={{textDecoration: "none"}}
          to="/administration/companies/add"
        >
          <Button className={classes.button}>
            <Typography className={classes.typographyButton}>Add company</Typography>
          </Button>
        </Link>
      </div>
      <div className={classes.table}>
        <CompanyList />
      </div>

      {/* {companies.map((companiesInfo) => (
        // <h1 key={company.id}>{company.name}</h1>
        <CompanyList companiesInfo={companiesInfo} />
      ))} */}
    </div>
  );
}
