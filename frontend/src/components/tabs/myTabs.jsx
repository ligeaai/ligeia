import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Highchart from "../../pages/main/overview/highchart";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}
function MyTabs() {
  const [value, setValue] = React.useState(0);
  const [itemCount, setItemCount] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="action tabs example"
        >
          {[...Array(itemCount)].map((x, i) => (
            <Tab
              key={`Dashboard ${i}`}
              label={`Dashboard ${i + 1}`}
              {...a11yProps(i)}
              sx={{ maxWidth: "150px", textTransform: "capitalize" }}
            />
          ))}
          <Grid
            container
            onClick={() => {
              setItemCount((prev) => prev + 1);
            }}
            sx={{
              height: "48px",
              width: "50px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item>+</Grid>
          </Grid>
        </Tabs>
      </AppBar>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <Highchart />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

export default MyTabs;
