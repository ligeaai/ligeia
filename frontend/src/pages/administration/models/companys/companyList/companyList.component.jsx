// import axios from "axios";
// import {useEffect, useState} from "react";
// import {Link} from "react-router-dom";
// import {makeStyles} from "@mui/styles";
// import Divider from "@mui/material/Divider";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import {Button} from "@mui/material";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import {Typography} from "@mui/material";
// import styles from "./companyListStyle";

// const useStyles = makeStyles(styles);

// function CompanyList(props) {
//   const classes = useStyles();
//   const [companies, setCompanies] = useState([]);

//   const webApiUrl = "http://192.168.1.104:8000/api/v1/companies/";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const {data: response} = await axios.get(webApiUrl, {
//           headers: {
//             Authorization: "Token 322ba55f7d3d3f8bf5d6186129f6863c559bedfa",
//           },
//         });
//         setCompanies(response);
//         console.log(response);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <div className={classes.tableContainer}>
//       <TableContainer className={classes.tableContainer}>
//         <div className={classes.tools}>
//           <Button className={classes.filterButton}>
//             <Typography>Filter</Typography>
//           </Button>
//           <Button className={classes.deleteButton}>
//             <Typography>Delete</Typography>
//           </Button>
//         </div>
//         <Table className={classes.table}>
//           <TableHead className={classes.tableHead}>
//             <TableRow className={classes.tableRowHead}>
//               <TableCell className={classes.tableCellHead}>Company</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody className={classes.tableBody}>
//             {companies.map((company) => (
//               <TableRow
//                 role="checkbox"
//                 key={company.id}
//                 className={classes.tableRowBody}
//               >
//                 <TableCell className={classes.tableCellBody}>
//                   {/* <Link></Link> */}
//                   {company.name}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default CompanyList;
import {styled, alpha} from "@mui/material/styles";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableFooter,
  TableCell,
  TableRow,
  TablePagination,
  IconButton,
  InputBase,
  Checkbox,
  Button,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useDispatch, useSelector} from "react-redux";
import {retrieveCompanies} from "../../../../../redux/actions/companiesActions";
import {Link} from "react-router-dom";
import styles from "./companyListStyle";

const useStyles = makeStyles(styles);

const CompanyList = () => {
  const classes = useStyles();

  const company = useSelector((state) => state.companiesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveCompanies());
  }, []);

  return (
    <div className={classes.companyList}>
      <div className={classes.actions}>
        {/* <Link
          style={{textDecoration: "none"}}
          to="/administration/companies/add"
        >
          <Button
            variant="outlined"
            className={classes.button}
            endIcon={<AddIcon />}
          >
            <Typography variant="button" className={classes.typographyButton}>
              Add company
            </Typography>
          </Button>
        </Link> */}
        <Typography variant="h5">Toolbar</Typography>
      </div>

      <div className={classes.searchBar} sx={{backgroundColor: "#FFFFFF"}}>
        {" "}
      </div>
      <TableContainer sx={{maxHeight: 440}} className={classes.tableContainer}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow></TableRow>
            <TableRow className={classes.tableHeadRow}>
              <TableCell className={classes.tableHeadCell}>
                <Checkbox />
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                <Typography variant="subtitle1">Name</Typography>
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                <Typography variant="subtitle1">Short name</Typography>
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                <Typography variant="subtitle1"> Contact name</Typography>
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                <Typography variant="subtitle1">Email</Typography>
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                <Typography variant="subtitle1">Country</Typography>
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                <Typography variant="subtitle1">Region</Typography>
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                <Typography variant="subtitle1">City</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {/* {company.results.map((company) => (
              <TableRow key={company.id}>
                <TableCell className={classes.tableBodyCell}>
                  <Checkbox />
                </TableCell>
                <TableCell className={classes.tableBodyCell}>
                  <Link
                    to={"/administration/companies/" + company.id}
                    className={classes.link}
                  >
                    <Typography>{company.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell className={classes.tableBodyCell}>
                  <Typography>{company.short_name}</Typography>
                </TableCell>
                <TableCell className={classes.tableBodyCell}>
                  <Typography>{company.contact_name}</Typography>
                </TableCell>
                <TableCell className={classes.tableBodyCell}>
                  <Typography>{company.email}</Typography>
                </TableCell>
                <TableCell className={classes.tableBodyCell}>
                  <Typography>{company.country}</Typography>
                </TableCell>
                <TableCell className={classes.tableBodyCell}>
                  <Typography>{company.region}</Typography>
                </TableCell>
                <TableCell className={classes.tableBodyCell}>
                  <Typography>{company.city}</Typography>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
          <TableFooter>
            <TablePagination />
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompanyList;
