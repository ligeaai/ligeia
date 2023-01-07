import React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { CustomNoRowsOverlay } from "./customNoRowOwerlay";
import CustomToolbar from "./customToolbar";
const dataGrid = (props) => {
  return (
    <DataGridPro
      componentsProps={{
        basePopper: {
          sx: {
            ".MuiDataGrid-columnsPanel": {
              span: {
                fontSize: "14px",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "14px",
            },
            "& .MuiButtonBase-root": {
              fontSize: "14px",
            },
          },
        },
      }}
      localeText={{
        toolbarColumns: "",
        toolbarFilters: "",
        toolbarDensity: "",
        toolbarExport: "",
      }}
      density="compact"
      components={{
        Toolbar: CustomToolbar,
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      {...props}
    />
  );
};

export default dataGrid;
