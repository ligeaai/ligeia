import React from "react";
import { DataGrid } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";

import { CustomNoRowsOverlay } from "../../../../../components";

import { columns } from "./columns";
import CustomToolbar from "./customToolbar";

import { editCell } from "../../../../../services/actions/roles/properties";

const PropertiesDataGrid = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.roles.rows);

  const onCellEditCommit = (cellData) => {
    const { id, field, value } = cellData;
    dispatch(editCell(id, field, value));
  };

  return (
    <DataGrid
      columns={columns}
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
  );
};

export default PropertiesDataGrid;
