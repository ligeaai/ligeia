import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
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
import { grey } from "@mui/material/colors";
import { getParentCode } from "../../../../services/api/djangoApi/codeList";
import history from "../../../../routers/history";
import ChildCodeList from "./childCodeList";

import { setCodeListChild } from "../../../../services/reducers/codeListChildReducer";
import { setParentCodeList } from "../../../../services/reducers/parentCodelist";
import MyTextField from "./myTextField";
function Row() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const codeListChild = useSelector((state) => state.codeListChild);
  const culture = useSelector((state) => state.lang.cultur);
  const myKeys = [
    "LIST_TYPE",
    "CULTURE",
    "CODE",
    "CODE_TEXT",
    "PARENT",
    "LEGACY_CODE",
    "VAL1",
    "VAL2",
    "VAL3",
    "VAL4",
    "VAL5",
    "VAL6",
    "VAL7",
    "VAL8",
    "VAL9",
    "VAL10",
    "DATE1",
    "DATE2",
    "DATE3",
    "DATE4",
    "DATE5",
    "CHAR1",
    "CHAR2",
    "CHAR3",
    "CHAR4",
    "CHAR5",
    "LAYER_NAME",
    "DESCRIPTION_ID",
    "HIDDEN",
    "LAST_UPDT_USER",
    "LAST_UPDT_DATE",
  ];
  React.useEffect(() => {
    const myFunc = async () => {
      let myData = await getParentCode(
        culture,
        codeListChild.codeListItems[codeListChild.index]
      );

      dispatch(
        setParentCodeList({
          ROW_ID: myData.ROW_ID,
          LIST_TYPE: myData.LIST_TYPE,
          CULTURE: myData.CULTURE,
          CODE: myData.CODE,
          CODE_TEXT: myData.CODE_TEXT,
          PARENT: myData.PARENT,
          LEGACY_CODE: myData.LEGACY_CODE,
          VAL1: myData.VAL1,
          VAL2: myData.VAL2,
          VAL3: myData.VAL3,
          VAL4: myData.VAL4,
          VAL5: myData.VAL5,
          VAL6: myData.VAL6,
          VAL7: myData.VAL7,
          VAL8: myData.VAL8,
          VAL9: myData.VAL9,
          VAL10: myData.VAL10,
          DATE1: myData.DATE1,
          DATE2: myData.DATE2,
          DATE3: myData.DATE3,
          DATE4: myData.DATE4,
          DATE5: myData.DATE5,
          CHAR1: myData.CHAR1,
          CHAR2: myData.CHAR2,
          CHAR3: myData.CHAR3,
          CHAR4: myData.CHAR4,
          CHAR5: myData.CHAR5,
          LAYER_NAME: myData.LAYER_NAME,
          DESCRIPTION_ID: myData.DESCRIPTION_ID,
          HIDDEN: myData.HIDDEN,
          LAST_UPDT_USER: myData.LAST_UPDT_USER,
          LAST_UPDT_DATE: myData.LAST_UPDT_DATE,
        })
      );
      dispatch(setCodeListChild({ currentChild: myData.CODE }));
    };
    myFunc();
    history.push(`${codeListChild.currentChild.toLowerCase()}`);
  }, [codeListChild.rowId]);
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          td: {
            width: "100px",
            p: 0,
            pr: 1,
            pl: 0.5,
            borderRight: "0.5px solid",
            borderColor: grey[200],
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          },
        }}
      >
        <TableCell
          sx={{
            width: "40px !important",
            padding: "0px !important",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{ margin: "auto" }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {myKeys.map((key, index) => (
          <TableCell key={index}>
            <MyTextField myKey={key} />
          </TableCell>
        ))}
      </TableRow>
      {codeListChild.index >= 0 ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={32}>
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
  return (
    <Box sx={{ owerflow: "scroll", m: 0 }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "calc(100% - 16px)",
          m: 0.5,
          minHeight: "calc(500px - 36px - 16px - 40px)",
          height: "calc(100vh - 60px - 36px - 16px - 44px)",
        }}
      >
        <Table aria-label="collapsible table" sx={{ width: "3300px" }}>
          <TableHead>
            <TableRow
              sx={{
                th: {
                  p: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                },
              }}
            >
              <TableCell sx={{ width: "40px !important" }} />
              <TableCell>List Type</TableCell>
              <TableCell>Culture</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Code Text</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Legacy Code</TableCell>

              <TableCell>Val1</TableCell>
              <TableCell>Val2</TableCell>
              <TableCell>Val3</TableCell>
              <TableCell>Val4</TableCell>
              <TableCell>Val5</TableCell>
              <TableCell>Val6</TableCell>
              <TableCell>Val7</TableCell>
              <TableCell>Val8</TableCell>
              <TableCell>Val9</TableCell>
              <TableCell>Val10</TableCell>

              <TableCell>Date1</TableCell>
              <TableCell>Date2</TableCell>
              <TableCell>Date3</TableCell>
              <TableCell>Date4</TableCell>
              <TableCell>Date5</TableCell>

              <TableCell>Char1</TableCell>
              <TableCell>Char2</TableCell>
              <TableCell>Char3</TableCell>
              <TableCell>Char4</TableCell>
              <TableCell>Char5</TableCell>

              <TableCell>Layer Name</TableCell>
              <TableCell>Description Id</TableCell>
              <TableCell>Hidden</TableCell>
              <TableCell>Last Update User</TableCell>
              <TableCell>Last Update Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Row />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
