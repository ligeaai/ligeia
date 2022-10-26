import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { setLoaderTrue } from "../../../../services/actions/loader";
import { getParentCode } from "../../../../services/api/djangoApi/codeList";
import history from "../../../../routers/history";
import ChildCodeList from "./childCodeList";

import { setParentCodeList } from "../../../../services/reducers/parentCodelist";
import MyTextField from "./myTextField";
function Row() {
  const [open, setOpen] = React.useState(true);
  const codeListChild = useSelector((state) => state.codeListChild);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <MyTextField myKey="LIST_TYPE" />
        </TableCell>
        <TableCell>
          <MyTextField myKey="CULTURE" />
        </TableCell>
        <TableCell>
          <MyTextField myKey="CODE" />
        </TableCell>
        <TableCell>
          <MyTextField myKey="CODE_TEXT" />
        </TableCell>
      </TableRow>
      {codeListChild.index >= 0 ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <ChildCodeList />
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState(false);
  const codeListChild = useSelector((state) => state.codeListChild);
  const culture = useSelector((state) => state.lang.cultur);
  React.useEffect(() => {
    setRows(false);
    dispatch(setLoaderTrue);
    const getData = async () => {
      let data = await getParentCode(culture, codeListChild.rowId);
      setRows(data);
      dispatch(
        setParentCodeList({
          ROW_ID: data.ROW_ID,
          LIST_TYPE: data.LIST_TYPE,
          CULTURE: data.CULTURE,
          CODE: data.CODE,
          CODE_TEXT: data.CODE_TEXT,
        })
      );
      dispatch(setLoaderTrue);
    };
    history.push(`${codeListChild.currentChild.toLowerCase()}`);
    if (codeListChild.index >= 0) {
      getData();
    }
  }, [codeListChild.rowId]);

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
}
