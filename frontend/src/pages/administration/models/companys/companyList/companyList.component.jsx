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

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModeEditSharpIcon from "@mui/icons-material/ModeEditSharp";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import {useDispatch, useSelector} from "react-redux";
import {retrieveCompanies} from "../../../../../redux/actions/companiesActions";
import {Link} from "react-router-dom";
import styles from "./companyListStyle";
import Settings from "../../../../../layouts/AdminLayout/settings/settings.component";

const useStyles = makeStyles(styles);

const CompanyList = () => {
  const classes = useStyles();
  const companies = useSelector((state) => state.companiesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveCompanies());
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className={classes.companyList}>
      <TableContainer
        sx={{minHeight: "100%"}}
        className={classes.tableContainer}
      >
        <div className={classes.actions}>
          <IconButton className={classes.iconButton} onClick={refreshPage}>
            <CachedRoundedIcon />
          </IconButton>
          <Link to="/configuration/companies/add">
            <IconButton className={classes.iconButton}>
              <AddRoundedIcon />
            </IconButton>
          </Link>
          <IconButton className={classes.iconButton}>
            <ModeEditSharpIcon />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <FilterAltRoundedIcon />
          </IconButton>
          <IconButton
            sx={{disableRipple: "true"}}
            className={classes.iconButton}
          >
            <DeleteRoundedIcon />
          </IconButton>
        </div>
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
            {/* {companies.results.map((company) => (
              <TableRow key={company.id}>
                <TableCell className={classes.tableBodyCell}>
                  <Checkbox />
                </TableCell>
                <TableCell className={classes.tableBodyCell}>
                  <Link
                    to={"/configuration/companies/" + company.id}
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
