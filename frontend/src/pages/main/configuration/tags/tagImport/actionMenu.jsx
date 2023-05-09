import React from "react";
import { useDispatch } from "react-redux";

import { IconButton } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import PublishIcon from "@mui/icons-material/Publish";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  deleteAllLogs,
  importExelFile,
  openWebSocket,
} from "../../../../../services/actions/tagImport/tagImport";
import TemplateExel from "./templateExel";
import { MyDialog } from "../../../../../components";

const ActionMenu = () => {
  const dispatch = useDispatch();
  function handleFileChange(event) {
    dispatch(importExelFile(event.target.files[0]));
  }

  return (
    <>
      <IconButton
        onClick={() => {
          dispatch(deleteAllLogs());
        }}
      >
        <RestoreFromTrashIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          dispatch(openWebSocket());
        }}
      >
        <HistoryIcon />
      </IconButton>
      <MyDialog
        Button={
          <IconButton>
            <ErrorOutlineIcon />
          </IconButton>
        }
        DialogBody={TemplateExel}
        defaultWH={[700, 500]}
      />
      <form action="submit">
        <label htmlFor="file-input">
          <input
            id="file-input"
            type="file"
            accept=".xlsx, .xls, .csv"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <IconButton component="span">
            <PublishIcon />
          </IconButton>
        </label>
      </form>
    </>
  );
};

export default ActionMenu;
