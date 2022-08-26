import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { getAll } from "../services/api/codelistapi";

import AddCodeList from "./AddCodeList";
import TableItems from "./tableItems";

const Code_list = () => {
  const dispatch = useDispatch();
  const [temp, setTemp] = useState([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      const data = await dispatch(getAll());
      if (data) {
        setTemp(data.data);
        setLoading(true);
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

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
            {loading ? (
              Object.keys(temp).map((key, i) => (
                <TableItems key={i} temp={temp[key][0]} />
              ))
            ) : (
              <CircularProgress
                sx={{ position: "absolute", left: "50%", top: "120px" }}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddCodeList />
    </Box>
  );
};

export default Code_list;
