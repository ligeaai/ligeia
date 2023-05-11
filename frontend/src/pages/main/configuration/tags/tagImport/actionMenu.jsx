import React from "react";
import { useDispatch } from "react-redux";

import { IconButton, Tooltip } from "@mui/material";
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
      <Tooltip
        title={"Delete"}
        componentsProps={{
          tooltip: {
            id: "action-menu-container__tooltip",
          },
        }}
      >
        <IconButton
          onClick={() => {
            dispatch(deleteAllLogs());
          }}
        >
          <RestoreFromTrashIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={"Log History"}
        componentsProps={{
          tooltip: {
            id: "action-menu-container__tooltip",
          },
        }}
      >
        <IconButton
          onClick={() => {
            dispatch(openWebSocket());
          }}
        >
          <HistoryIcon />
        </IconButton>
      </Tooltip>
      <MyDialog
        Button={
          <Tooltip
            title={"Helper Exel"}
            componentsProps={{
              tooltip: {
                id: "action-menu-container__tooltip",
              },
            }}
          >
            <IconButton>
              <ErrorOutlineIcon />
            </IconButton>
          </Tooltip>
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
          <Tooltip
            title={"Helper Exel"}
            componentsProps={{
              tooltip: {
                id: "action-menu-container__tooltip",
              },
            }}
          >
            <IconButton component="span">
              <PublishIcon />
            </IconButton>
          </Tooltip>
        </label>
      </form>
    </>
  );
};

export default ActionMenu;
