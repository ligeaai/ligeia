import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataGrid from "../../datagrid/dataGrid";

const matrix = ({ highchartProps, width, height }) => {
  return (
    <Box sx={{ width: width, height: height }}>
      <Grid container>
        <Grid item xs={8}>
          <Box sx={{ width: (width * 8) / 12, height: height }}>
            <DataGrid columns={[]} rows={[]} />
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ p: 2 }}>
          <Grid
            container
            sx={{ border: "1px solid black", boxShadow: 1, p: 0.5 }}
          >
            <Grid item xs={6}>
              Machine:
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              Speed:
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              Load:
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              State:
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              Alarm:
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default matrix;
