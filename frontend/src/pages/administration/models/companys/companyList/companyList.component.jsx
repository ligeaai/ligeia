import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import {Button} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";
import styles from "./companyListStyle";

const useStyles = makeStyles(styles);

function CompanyList(props) {
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);

  const webApiUrl = "http://192.168.1.104:8000/api/v1/companies/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get(webApiUrl, {
          headers: {
            Authorization: "Token 322ba55f7d3d3f8bf5d6186129f6863c559bedfa",
          },
        });
        setCompanies(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={classes.tableContainer}>
      <TableContainer className={classes.tableContainer}>
        <div className={classes.tools}>
          <Button className={classes.filterButton}>
            <Typography>Filter</Typography>
          </Button>
          <Button className={classes.deleteButton}>
            <Typography>Delete</Typography>
          </Button>
        </div>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.tableRowHead}>
              <TableCell className={classes.tableCellHead}>Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {companies.map((company) => (
              <TableRow
                role="checkbox"
                key={company.id}
                className={classes.tableRowBody}
              >
                <TableCell className={classes.tableCellBody}>
                  {/* <Link></Link> */}
                  {company.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CompanyList;
