import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CheckBox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { grey } from "@mui/material/colors";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  setLoaderTrue,
  setLoaderFalse,
} from "../../../../services/actions/loader";
import {
  getChildCodeList,
  deleteCodeList,
  getParentCode,
} from "../../../../services/api/djangoApi/codeList";
import history from "../../../../routers/history";
import { setConfirmation } from "../../../../services/reducers/confirmation";
import ChildCodeList from "./childCodeList";
import { ComponentErrorBody } from "../../../../components";
export default function CollapsibleTable() {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState(false);
  const codeListChild = useSelector((state) => state.codeListChild);
  const culture = useSelector((state) => state.lang.cultur);
  function Row() {
    const [rowsChild, setRowsChild] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const [checkboxSelection, setCheckboxSelection] = React.useState([]);

    // const deleteChildAgreeFunc = async () => {
    //   dispatch(setLoaderTrue);
    //   setCheckboxSelection([]);
    //   await rowsChild.data.map((e) => {
    //     if (checkboxSelection.indexOf(e.CODE) !== -1) {
    //       deleteCodeList(e.LIST_TYPE, culture, e.CODE);
    //     }
    //   });
    //   setRowsChild(false);
    //   let data = await getChildCodeList(codeListChild.currentChild, culture);
    //   setRowsChild(data);
    //   setOpen(true);
    //   dispatch(setLoaderFalse);
    // };
    // const deleteChild = () => {
    //   dispatch(
    //     setConfirmation({
    //       title: "Are you sure you want to delete the following items?",
    //       body: "Here, the items to be deleted will appear in the data grid.",
    //       agreefunction: deleteChildAgreeFunc,
    //     })
    //   );
    // };

    // const openTable = () => {
    //   setRowsChild(false);
    //   dispatch(setLoaderTrue);
    //   const getData = async () => {
    //     let data = await getChildCodeList(codeListChild.currentChild, culture);
    //     setRowsChild(data);
    //     dispatch(setLoaderTrue);
    //   };
    //   history.push(`${codeListChild.currentChild.toLowerCase()}`);
    //   getData();
    // };
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                // if (!open) {
                //   openTable();
                // }
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{rows.LIST_TYPE}</TableCell>
          <TableCell>{rows.CULTURE}</TableCell>
          <TableCell>{rows.CODE}</TableCell>
          <TableCell>{rows.CODE_TEXT}</TableCell>
        </TableRow>
        {/* {rowsChild ? ( */}
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {/* <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Childs
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Grid
                            container
                            sx={{
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Grid
                              item
                              sx={{ alignItems: "center", displat: "flex" }}
                            >
                              <Tooltip
                                title={"Add Child"}
                                componentsProps={{
                                  tooltip: {
                                    sx: { backgroundColor: "primary.dark" },
                                  },
                                }}
                              >
                                <IconButton onClick={() => {}}>
                                  <AddBoxIcon
                                    fontSize="small"
                                    sx={{ color: "#4B4B4B" }}
                                  />
                                </IconButton>
                              </Tooltip>
                              <Tooltip
                                title={"Delete Child"}
                                componentsProps={{
                                  tooltip: {
                                    sx: { backgroundColor: "primary.dark" },
                                  },
                                }}
                              >
                                <IconButton onClick={deleteChild}>
                                  <DeleteIcon
                                    fontSize="small"
                                    sx={{ color: "#4B4B4B" }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>List type</TableCell>
                        <TableCell>Culture</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell> Code Text</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowsChild.data.map((e, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <CheckBox
                              onClick={() => {
                                setCheckboxSelection([
                                  ...checkboxSelection,
                                  e.CODE,
                                ]);
                              }}
                            />
                          </TableCell>
                          <TableCell>{e.LIST_TYPE}</TableCell>
                          <TableCell>{e.CULTURE}</TableCell>
                          <TableCell>{e.CODE}</TableCell>
                          <TableCell>{e.CODE_TEXT}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box> */}
              <ChildCodeList />
            </Collapse>
          </TableCell>
        </TableRow>
        {/* ) : (
          <></>
        )} */}
      </React.Fragment>
    );
  }

  React.useEffect(() => {
    setRows(false);
    dispatch(setLoaderTrue);
    const getData = async () => {
      let data = await getParentCode(culture, codeListChild.currentChild);
      setRows(data);
      console.log(rows);
      dispatch(setLoaderTrue);
    };
    history.push(`${codeListChild.currentChild.toLowerCase()}`);
    getData();
  }, [codeListChild]);

  if (rows.CODE) {
    return (
      <TableContainer
        component={Paper}
        sx={{
          width: "800px",
          m: 0.5,
          minHeight: "calc(500px - 36px - 16px - 40px)",
          height: "calc(100vh - 60px - 36px - 16px - 44px)",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>List type</TableCell>
              <TableCell>Culture</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Code Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Row />
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <Box
        component={Paper}
        sx={{
          width: "800px",
          m: 0.5,
          border: "1px solid",
          borderColor: grey[200],
          borderRadius: "5px",
          minHeight: "calc(500px - 36px - 16px - 40px)",
          height: "calc(100vh - 60px - 36px - 16px - 44px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ComponentErrorBody
          text="Something went wrong"
          icon={<ErrorOutlineIcon />}
        />
      </Box>
    );
  }
}
