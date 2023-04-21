import React from "react";
import { DataGrid } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";

import { CustomNoRowsOverlay } from "../../../../../components";

import { getColumns } from "./columns";
import CustomToolbar from "./customToolbar";

import { editCell } from "../../../../../services/actions/roles/properties";
import { Box } from "@mui/material";

const PropertiesDataGrid = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.roles.rows);

  const onCellEditCommit = (cellData) => {
    const { id, field, value } = cellData;
    dispatch(editCell(id, field, value));
  };

  return (
    <Box
      className="roles-container__body__property-box__datagrid"
      sx={{
        button: {
          minWidth: "36px",
          height: "36px",
          borderRadius: "36px",
          span: {
            m: 0,
          },
        },
      }}
    >
      <DataGrid
        columns={dispatch(getColumns())}
        rows={Object.values(rows)}
        // hideFooter={true}
        onCellEditCommit={onCellEditCommit}
        getRowId={(row) => row.ROW_ID}
        pagination
        componentsProps={{
          footer: {
            style: { justifyContent: "flex-start" },
          },
        }}
        autoPageSize={true}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </Box>
  );
};

export default PropertiesDataGrid;
