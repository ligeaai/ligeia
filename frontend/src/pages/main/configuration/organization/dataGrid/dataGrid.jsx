import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { DataGridPro } from "@mui/x-data-grid-pro";
import { loadType } from "../../../../../services/api/type/type";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import MyTextField from "./../myTextField";
import {
  setValue,
  changeValue,
} from "../../../../../services/reducers/typeReducer";
import { setTextValue } from "../../../../../services/reducers/typeTextReducer";

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
    top: [
      {
        PROPERTY_NAME: "",
        CODE_LIST: null,
        MANDATORY: "none",
        LABEL_ID: "HISTORY",
        PROP_GRP: "",
        PROPERTY_TYPE: "HISTORY",
        SORT_ORDER: "",
        "RESOURCE-LIST": [
          {
            SHORT_LABEL: "",
          },
        ],
      },
    ],
    bottom: [],
  };
  React.useEffect(() => {
    dispatch(loadRows("en-US", type));
  }, []);
  const onCellEditCommit = (cellData) => {
    const { id, field, value } = cellData;
    dispatch(editRow(id, field, value));
  };
  if (rows) {
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
      />
    );
  }
};

export default MyDataGrid;
