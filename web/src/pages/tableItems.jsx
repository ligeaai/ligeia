import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Collapse,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import CodeListSetting from "./CodeListSetting";
import { getWithLISTTYPE } from "../services/api/codelistapi";

const TableItems = (props) => {
  const dispatch = useDispatch();
  const [temp, setTemp] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onClickHandler = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsLoading(false);
      setTemp([]);
    } else {
      setIsOpen(true);
      let abortController = new AbortController();
      const fetchData = async () => {
        const data = await dispatch(getWithLISTTYPE(props.temp.LISTTYPE));
        if (data) {
          setTemp(data);
          setIsLoading(true);
        }
      };
      fetchData();
      return () => {
        abortController.abort();
      };
    }
  };
  return (
    <>
      <React.Fragment>
        <TableRow>
          <TableCell
            sx={{ cursor: "pointer" }}
            onClick={() => {
              onClickHandler();
            }}
          >
            +
          </TableCell>
          <TableCell>{props.temp.LISTTYPE}</TableCell>
          <TableCell>{props.temp.CULTURE}</TableCell>
          <TableCell>{props.temp.CODE}</TableCell>
          <TableCell>{props.temp.CODETEXT}</TableCell>
          <TableCell>{props.temp.PARENT}</TableCell>
          <TableCell>{props.temp.LEGACYMODE}</TableCell>
          <TableCell>{props.temp.VAL1}</TableCell>
          <TableCell>{props.temp.VAL2}</TableCell>
          <TableCell>{props.temp.VAL3}</TableCell>
          <TableCell>{props.temp.VAL4}</TableCell>
          <TableCell>{props.temp.VAL5}</TableCell>
          <TableCell>{props.temp.VAL6}</TableCell>
          <TableCell>{props.temp.VAL7}</TableCell>
          <TableCell>{props.temp.VAL8}</TableCell>
          <TableCell>{props.temp.VAL9}</TableCell>
          <TableCell>{props.temp.VAL10}</TableCell>
          <TableCell>{props.temp.DATE1}</TableCell>
          <TableCell>{props.temp.DATE2}</TableCell>
          <TableCell>{props.temp.DATE3}</TableCell>
          <TableCell>{props.temp.DATE4}</TableCell>
          <TableCell>{props.temp.DATE5}</TableCell>
          <TableCell>{props.temp.CHAR1}</TableCell>
          <TableCell>{props.temp.CHAR2}</TableCell>
          <TableCell>{props.temp.CHAR3}</TableCell>
          <TableCell>{props.temp.CHAR4}</TableCell>
          <TableCell>{props.temp.CHAR5}</TableCell>
          <TableCell>{props.temp.LAYERNAME}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={28}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              {isLoading ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
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
                    {temp.map((data, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <CodeListSetting id={data.id} />
                        </TableCell>
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
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <>
                  {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((a, i) => (
                    <Box
                      sx={{
                        width: "8%",
                        display: "inline-block",
                        margin: "1%",
                      }}
                      key={i}
                    >
                      <Skeleton />
                      <Skeleton animation="wave" />
                      <Skeleton animation={false} />
                    </Box>
                  ))}
                </>
              )}
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </>
  );
};

export default TableItems;
