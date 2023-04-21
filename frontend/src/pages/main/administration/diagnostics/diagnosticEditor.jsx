import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { DataGrid } from "../../../../components";

import { useSelector } from "react-redux";
const dataGridPicker = {
  0: "alarmHistory",
  1: "alarmHistory",
  2: "alarmHistory",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const column = useSelector(
    (state) => state.diagnostic[dataGridPicker[value]].column
  );
  const row = useSelector(
    (state) => state.diagnostic[dataGridPicker[value]].row
  );
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ height: "calc(100% - 48px)" }}
      {...other}
    >
      {value === index && column.length > 0 ? (
        <Box sx={{ height: "100%", p: 2 }}>
          <DataGrid columns={column} rows={row} />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function DiagnosticEditor() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          textColor="inherit"
          sx={{
            minHeight: "40px",
            backgroundColor: "background.info",
            pt: "2px",
            color: "text.primary",
          }}
        >
          {["Alarm History", "Communications Status", "System Health"].map(
            (e, i) => {
              return (
                <Tab
                  label={e}
                  {...a11yProps(i)}
                  sx={{ textTransform: "capitalize" }}
                />
              );
            }
          )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={value}></TabPanel>
    </Box>
  );
}

export default React.memo(DiagnosticEditor);
