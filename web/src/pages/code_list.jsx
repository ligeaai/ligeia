import React from "react";

import { TableContainer, Box } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TableItems from "./tableItems";
import AddCodeList from "./AddCodeList";

const Code_list = () => {
  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          position: "relative",
          height: "calc(100vh - 157px)",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Listtype</TableCell>
              <TableCell align="center">Culture</TableCell>
              <TableCell align="center">Code</TableCell>
              <TableCell align="center">Codetext</TableCell>
              <TableCell align="center">Parent</TableCell>
              <TableCell align="center">Legacycode</TableCell>
              <TableCell align="center">Val1</TableCell>
              <TableCell align="center">Val2</TableCell>
              <TableCell align="center">Val3</TableCell>
              <TableCell align="center">Val4</TableCell>
              <TableCell align="center">Val5</TableCell>
              <TableCell align="center">Val6</TableCell>
              <TableCell align="center">Val7</TableCell>
              <TableCell align="center">Val8</TableCell>
              <TableCell align="center">Val9</TableCell>
              <TableCell align="center">Val10</TableCell>
              <TableCell align="center">Date1</TableCell>
              <TableCell align="center">Date2</TableCell>
              <TableCell align="center">Date3</TableCell>
              <TableCell align="center">Date4</TableCell>
              <TableCell align="center">Date5</TableCell>
              <TableCell align="center">Char1</TableCell>
              <TableCell align="center">Char2</TableCell>
              <TableCell align="center">Char3</TableCell>
              <TableCell align="center">Char4</TableCell>
              <TableCell align="center">Char5</TableCell>
              <TableCell align="center">LayerName</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableItems />
          </TableBody>
        </Table>
      </TableContainer>
      <AddCodeList />
    </Box>
  );
};

export default Code_list;
