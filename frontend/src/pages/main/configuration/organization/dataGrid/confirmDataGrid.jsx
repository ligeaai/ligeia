import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";

import CustomColumnMenu from "./customColumnMenu";
import CustomToolbar from "./customToolbar";
import {
  loadRows,
  editRow,
} from "../../../../../services/actions/company/datagrid";
import { MyTextFieldRender } from "../myTextField";
const MyDataGrid = ({ type }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.companyDataGrid.columns);
  const rows = useSelector((state) => state.companyDataGrid.rows);
  const [myColumn, setMyColumn] = React.useState(false);
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
    var myColumnsTemp = {};
    Object.keys(columns).map((e, i) => {
      if (i > 3) {
        var temp = {
          ...columns[e],
          editable: false,
          renderCell: MyTextFieldRender,
        };
      } else {
        var temp = {
          ...columns[e],
        };
      }
      console.log(temp);
      delete temp.renderEditCell;
      //delete temp.renderCell;
      myColumnsTemp[e] = temp;
      setMyColumn(myColumnsTemp);
    });
  }, []);
  console.log(myColumn);
  if (Object.keys(rows).length !== 0 && myColumn) {
    return (
      <Box
        sx={{
          width: `100%`,
          minHeight: "400px",
          height: "400px",

          button: { color: "#4B4B4B" },
          m: 0.5,
          border: "0.5px solid",

          borderRadius: "5px",
        }}
      >
        <DataGridPro
          rows={Object.values(rows)}
          density="compact"
          columns={Object.values(myColumn)}
          hideFooter={true}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          components={{
            Toolbar: CustomToolbar,
            ColumnMenu: CustomColumnMenu,
          }}
          getRowId={(row) => row.PROPERTY_NAME}
          pinnedRows={pinnedRows}
          experimentalFeatures={{ rowPinning: true }}
          disableSelectionOnClick={true}
          disableVirtualization={true}
        />
      </Box>
    );
  }
};

export default MyDataGrid;
