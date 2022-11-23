import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { DataGridPro } from "@mui/x-data-grid-pro";

import CustomColumnMenu from "./customColumnMenu";
import CustomToolbar from "./customToolbar";
import { editRow } from "../../../../../services/actions/company/datagrid";
import { selectItem } from "../../../../../services/actions/company/item";
import { addItemType } from "../../../../../services/actions/company/datagrid";
import { CustomNoRowsOverlay } from "../../../../../components";

const MyDataGrid = ({ type, isLinksActive }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.companyDataGrid.columns);
  const rows = useSelector((state) => state.companyDataGrid.rows);
  const loading = useSelector((state) => state.companyDataGrid.loading);
  const selectedItem = useSelector((state) => state.item.selectedItem);
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
    if (!isLinksActive) {
      if (type === selectedItem.ITEM_TYPE) {
        dispatch(selectItem(selectedItem.selectedIndex));
      } else {
        dispatch({
          type: "SET_SELECTED_ITEM",
          payload: -3,
        });
      }
      dispatch(addItemType(type));
      dispatch({
        type: "CLEAN_ROWS",
      });
    }
  }, [type]);

  const onCellEditCommit = (cellData) => {
    const { id, field, value } = cellData;
    let myId = id;
    if (id === "") {
      //todo find better way
      myId = "HISTORY";
    }
    dispatch(editRow(myId, field, value));
  };
  if (Object.keys(rows).length !== 0) {
    return (
      <DataGridPro
        componentsProps={{
          basePopper: {
            sx: {
              ".MuiDataGrid-columnsPanel": {
                "&>*:nth-of-type(n+5)": {
                  display: "none",
                },
              },
            },
          },
        }}
        rows={Object.values(rows)}
        density="compact"
        columns={Object.values(columns)}
        hideFooter={true}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        loading={loading}
        components={{
          Toolbar: CustomToolbar,
          ColumnMenu: CustomColumnMenu,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        getRowId={(row) => row.PROPERTY_NAME}
        pinnedRows={pinnedRows}
        experimentalFeatures={{ rowPinning: true }}
        onCellEditCommit={onCellEditCommit}
        disableSelectionOnClick={true}
        //disableVirtualization={true}
      />
    );
  } else {
    return <CustomNoRowsOverlay text="No Rows and Columns" />;
  }
};

export default MyDataGrid;
