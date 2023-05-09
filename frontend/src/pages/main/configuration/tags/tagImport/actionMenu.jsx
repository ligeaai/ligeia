import React from "react";

import { IconButton } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { importExelFile } from "../../../../../services/actions/tagImport/tagImport";
import TemplateExel from "./templateExel";
import { MyDialog } from "../../../../../components";

const ActionMenu = () => {
  function handleFileChange(event) {
    importExelFile(event.target.files[0]);
  }

  return (
    <>
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
