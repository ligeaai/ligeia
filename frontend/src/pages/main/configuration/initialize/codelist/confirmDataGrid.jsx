import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { grey } from "@mui/material/colors";

import LinearProgress from "@mui/material/LinearProgress";

const getTreeDataPath = (row) => row.HIERARCHY;

const groupingColDef = {
  headerName: "",
  hideDescendantCount: true,
  valueFormatter: () => "",
  width: 50,
  // minWidth: 0,

  resizable: false,
};

export default function TreeDataWithGap() {
  const rows = useSelector((state) => state.dataGridCodeList.rows);
  const columns = useSelector((state) => state.dataGridCodeList.columns);
  const [myColumns, setMyColumns] = React.useState([]);
  React.useEffect(() => {
    setMyColumns(columns);
    Object.keys(myColumns).map((e) => {
      myColumns[e].editable = false;
      delete myColumns[e].renderCell;
    });
    console.log(myColumns);
  }, []);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "CODE",
      sort: "asc",
    },
  ]);

  return (
    <Box>
      <Box
        sx={{
          m: 0.5,
          "& .super-app-theme--cell": {
            backgroundColor: grey[200],
          },

          button: {
            minWidth: "36px",
            height: "36px",
            borderRadius: "50px",
          },
        }}
      >
        <Box
          sx={{
            minHeight: "300px",
            height: "400px",
            width: "500px",
            "& .MuiInputBase-input": {
              padding: "0px important",
            },
            "& .MuiDataGrid-cellContent": {
              fontSize: "16px",
            },
            "& .super-app-theme--cell": {
              backgroundColor: grey[200],
            },

            "& .MuiDataGrid-virtualScrollerRenderZone": {
              "&>*:nth-of-type(1)": {
                "&>*:nth-of-type(1)": {
                  svg: {
                    display: "none",
                  },
                },
              },
            },
          }}
        >
          <DataGridPro
            componentsProps={{
              basePopper: {
                sx: {
                  ".MuiDataGrid-columnsPanel": {
                    "&>*:nth-of-type(2)": {
                      display: "none",
                    },
                  },
                },
              },
            }}
            density="compact"
            defaultGroupingExpansionDepth={1}
            hideFooter={true}
            treeData
            rows={Object.values(rows)}
            columns={myColumns}
            getTreeDataPath={getTreeDataPath}
            getRowId={(row) => row.ROW_ID}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            components={{
              LoadingOverlay: LinearProgress,
            }}
            groupingColDef={groupingColDef}
            disableIgnoreModificationsIfProcessingProps
          />
        </Box>
      </Box>
    </Box>
  );
}
