import React, { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import CircularProgress from "@mui/material/CircularProgress";
import { TableCell, TableRow } from "@mui/material";

import { getAll } from "../services/api/codelistapi";

const TableItems = () => {
  const [temp, setTemp] = useState([]);
  const [datalen, setDatalen] = useState(30);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      const data = await getAll();
      setTemp(data.data);
      setLoading(true);
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      {loading ? (
        temp.slice(0, datalen).map((data, i) => {
          return (
            <React.Fragment key={i}>
              <Waypoint
                onEnter={() => {
                  if (i === datalen - 10) {
                    setDatalen(datalen + 30);
                  }
                }}
              />
              <TableRow>
                <TableCell />
                <TableCell>{data.LISTTYPE}</TableCell>
                <TableCell>{data.CULTURE}</TableCell>
                <TableCell>{data.CODE}</TableCell>
                <TableCell>{data.CODETEXT}</TableCell>
                <TableCell>{data.PARENT}</TableCell>
                <TableCell>{data.LEGACYMODE}</TableCell>
                <TableCell>{data.VAL1}</TableCell>
                <TableCell>{data.VAL2}</TableCell>
                <TableCell>{data.VAL3}</TableCell>
                <TableCell>{data.VAL4}</TableCell>
                <TableCell>{data.VAL5}</TableCell>
                <TableCell>{data.VAL6}</TableCell>
                <TableCell>{data.VAL7}</TableCell>
                <TableCell>{data.VAL8}</TableCell>
                <TableCell>{data.VAL9}</TableCell>
                <TableCell>{data.VAL10}</TableCell>
                <TableCell>{data.DATE1}</TableCell>
                <TableCell>{data.DATE2}</TableCell>
                <TableCell>{data.DATE3}</TableCell>
                <TableCell>{data.DATE4}</TableCell>
                <TableCell>{data.DATE5}</TableCell>
                <TableCell>{data.CHAR1}</TableCell>
                <TableCell>{data.CHAR2}</TableCell>
                <TableCell>{data.CHAR3}</TableCell>
                <TableCell>{data.CHAR4}</TableCell>
                <TableCell>{data.CHAR5}</TableCell>
                <TableCell>{data.LAYERNAME}</TableCell>
              </TableRow>
            </React.Fragment>
          );
        })
      ) : (
        <CircularProgress
          sx={{ position: "absolute", left: "50%", top: "120px" }}
        />
      )}
    </>
  );
};

export default TableItems;
