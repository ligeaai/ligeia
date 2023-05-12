import React from "react";
import { Box, Button } from "@mui/material";

import { DialogHeaderHelper, DataGrid } from "../../../../../../components";
import { columns, rows } from "./columns";
const templateExel = ({ handleClose }) => {
  return (
    <React.Fragment>
      <Box>
        <DialogHeaderHelper text="Tag Import Helper Exel" />
      </Box>
      <Box
        className="tag-manager-container__body__action-box__helper-datagrid"
        sx={{
          button: {
            minWidth: "36px",
            height: "36px",
            borderRadius: "50px",
            color: "icon.secondary",
            span: {
              m: 0,
            },
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} hideFooter />
      </Box>
      <Box className="dialog-container__paper__footer">
        <Box className="tag-manager-container__body__action-box__footer">
          <Box className="tag-manager-container__body__action-box__footer__content">
            Notes: Tag name is required.
          </Box>
          <Box className="tag-manager-container__body__action-box__footer__cancel">
            <Button
              color="inherit"
              onClick={() => {
                handleClose();
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default templateExel;
