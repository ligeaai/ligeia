import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { DataGridPro } from "@mui/x-data-grid-pro";

import CustomColumnMenu from "./customColumnMenu";
import CustomToolbar from "./customToolbar";
import {
  loadRows,
  editRow,
} from "../../../../../services/actions/company/datagrid";
const MyDataGrid = ({ type }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.companyDataGrid.columns);
  const rows = useSelector((state) => state.companyDataGrid.rows);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "SORT_ORDER",
      sort: "asc",
    },
  ]);
  const pinnedRows = {
    top: [rows.HISTORY],
    bottom: [],
  };

  React.useEffect(() => {
    dispatch(loadRows("en-US", type));
  }, []);
  const onCellEditCommit = (cellData) => {
    const { id, field, value } = cellData;
    dispatch(editRow(id, field, value));
  };
  if (Object.keys(rows).length !== 0) {
    return (
      <DataGridPro
        rows={Object.values(rows)}
        density="compact"
        columns={Object.values(columns)}
        hideFooter={true}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        components={{
          Toolbar: CustomToolbar,
          ColumnMenu: CustomColumnMenu,
        }}
        getRowId={(row) => row.LABEL_ID}
        pinnedRows={pinnedRows}
        experimentalFeatures={{ rowPinning: true }}
        onCellEditCommit={onCellEditCommit}
        disableSelectionOnClick={true}
      />
    );
  }
};

export default MyDataGrid;
