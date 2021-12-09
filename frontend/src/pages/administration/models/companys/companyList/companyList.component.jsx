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

import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  Checkbox,
  Button,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {retrieveCompanies} from "../../../../../redux/actions/companiesActions";
import {Link} from "react-router-dom";
import styles from "./companyListStyle";
import CompanyAdd from "../companyAdd/companyAdd.component";

const useStyles = makeStyles(styles);

const CompanyList = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const company = useSelector((state) => state.companiesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveCompanies());
  }, []);

  return (
    <div className={classes.companyList}>
      <div className={classes.actions}>
        <Link
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
        </Link>
      </div>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.tableHeadRow}>
              <TableCell className={classes.tableHeadCell}>
                <Checkbox />
              </TableCell>
              <TableCell className={classes.tableHeadCell}>Name</TableCell>
              <TableCell className={classes.tableHeadCell}>
                Short name
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                Contact name
              </TableCell>
              <TableCell className={classes.tableHeadCell}>Email</TableCell>
              <TableCell className={classes.tableHeadCell}>Country</TableCell>
              <TableCell className={classes.tableHeadCell}>Region</TableCell>
              <TableCell className={classes.tableHeadCell}>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {/* {company.results.map((result, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Link
                    to={"/administration/companies/" + result.id}
                    className={classes.link}
                  >
                    {result.name}
                  </Link>
                </TableCell>
                <TableCell>{result.short_name}</TableCell>
                <TableCell>{result.contact_name}</TableCell>
                <TableCell>{result.email}</TableCell>
                <TableCell>{result.country}</TableCell>
                <TableCell>{result.region}</TableCell>
                <TableCell>{result.city}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompanyList;
