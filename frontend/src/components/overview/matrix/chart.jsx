import React from "react";
import Box from "@mui/material/Box";
import DataGrid from "../../datagrid/dataGrid";
import "../../../assets/styles/components/overview/matrixWidget.scss";
const Matrix = ({ highchartProps }) => {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    let column = [{ field: "tag", headerName: " ", flex: 2 }];
    Promise.all(
      highchartProps?.Assets?.map((e) => {
        column.push({
          field: e[0],
          headerName: e[1],
          flex: 1,
          renderCell: (params) => {
            console.log(params);
            return (
              params?.row?.[params.field] && <>{params?.row?.[params.field]}</>
            );
          },
        });
      })
    );
    setColumns(column);
    let shortnames = {};
    Promise.all(
      highchartProps?.Inputs?.map((e, i) => {
        if (e.SHORT_NAME === null) {
          shortnames[e.NAME] = false;
          highchartProps.Inputs[i].SHORT_NAME = e.NAME;
        } else {
          shortnames[e.SHORT_NAME] = false;
        }
      })
    );

    let row = [];

    Promise.all(
      Object.keys(shortnames).map((e, i) => {
        let temp = highchartProps?.Inputs?.filter((a) => a.SHORT_NAME === e);
        let rowItem = {
          id: i,
          tag: temp[0].SHORT_NAME,
        };
        temp.map((e) => {
          rowItem = { ...rowItem, [e.ITEM_ID]: e.TAG_ID };
        });
        row.push(rowItem);
      })
    );
    console.log(row);
    setRows(row);
  }, []);
  return (
    <Box className="matrix-widget-container">
      <DataGrid columns={columns} rows={rows} />
    </Box>
  );

  //   return (
  //     <Box sx={{ width: width, height: height }}>
  //       <Grid container>
  //         <Grid item xs={8}>
  //           <Box sx={{ width: (width * 8) / 12, height: height }}>
  //             <DataGrid columns={[]} rows={[]} />
  //           </Box>
  //         </Grid>
  //         <Grid item xs={4} sx={{ p: 2 }}>
  //           <Grid
  //             container
  //             sx={{ border: "1px solid black", boxShadow: 1, p: 0.5 }}
  //           >
  //             <Grid item xs={6}>
  //               Machine:
  //             </Grid>
  //             <Grid item xs={6}></Grid>
  //             <Grid item xs={6}>
  //               Speed:
  //             </Grid>
  //             <Grid item xs={6}></Grid>
  //             <Grid item xs={6}>
  //               Load:
  //             </Grid>
  //             <Grid item xs={6}></Grid>
  //             <Grid item xs={6}>
  //               State:
  //             </Grid>
  //             <Grid item xs={6}></Grid>
  //             <Grid item xs={6}>
  //               Alarm:
  //             </Grid>
  //             <Grid item xs={6}></Grid>
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   );
};

export default Matrix;
