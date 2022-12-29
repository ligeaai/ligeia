import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../../assets/css/react-grid-layout.css";
import "../../assets/css/react-resizable.css";
import { useDispatch, useSelector } from "react-redux";
import TabItems from "../../layout/main/overview/tabItems";
import {
  selectTab,
  addNewTabItem,
  updateTabHeader,
  deleteTapHeader,
} from "../../services/actions/overview/taps";
import palette from "../../themes/palette";
import { MyTextField } from "..";
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
let value = "";

const MyTap = React.forwardRef(({ x, i, ...rest }, ref) => {
  const [changeText, setChangeText] = React.useState(false);
  const [iconIsActive, setIconIsActive] = React.useState(false);
  const dispatch = useDispatch();
  const onChange = (e) => {
    value = e;
  };
  const handleUserClick = () => {
    setChangeText(false);
    dispatch(updateTabHeader(x, value));
  };
  React.useEffect(() => {
    if (changeText) {
      value = x;
      window.addEventListener("click", handleUserClick);
    }
    return () => {
      window.removeEventListener("click", handleUserClick);
    };
  }, [changeText]);
  if (!changeText)
    return (
      <Box
        sx={{
          height: "48px",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
        onMouseEnter={() => setIconIsActive(true)}
        onMouseLeave={() => setIconIsActive(false)}
      >
        <Tab
          ref={ref}
          label={`${x}`}
          {...a11yProps(i)}
          {...rest}
          sx={{
            maxWidth: "150px",
            textTransform: "capitalize",
          }}
          onClick={() => {
            dispatch(selectTab(x));
          }}
          onDoubleClick={() => {
            setChangeText(true);
          }}
        />
        <DeleteIcon
          fontSize="small"
          sx={{
            cursor: "pointer",
            display: iconIsActive ? "flex" : "none",
            position: "absolute",
            right: 0,
          }}
          onClick={() => {
            dispatch(deleteTapHeader(x));
          }}
        ></DeleteIcon>
      </Box>
    );
  return (
    <Box sx={{ display: "flex", alignItems: "center", maxWidth: "150px" }}>
      <MyTextField
        defaultValue={x}
        handleChangeFunc={onChange}
        autoFocus
        {...rest}
      />
    </Box>
  );
});
function MyTabs() {
  console.log(palette());
  const ref = React.createRef();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(null);
  const titles = useSelector((state) => state.tapsOverview.titles);
  const widgets = useSelector((state) => state.tapsOverview.widgets);
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
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
        position: "relative",
        height: "100%",
        ".react-swipeable-view-container": {
          height: "100%",
        },
        "#myResponsiveGridLayout": {
          backgroundColor: "background.main"
        }
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="action tabs example"
          sx={{ height: "48px", backgroundColor: "background.info" }}
        >
          {titles.map((x, i) => (
            <MyTap ref={ref} key={`${x}`} x={x} i={i}></MyTap>
          ))}
          <Grid
            key={`a`}
            container
            sx={{
              height: "48px",
              width: "50px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              item
              onClick={() => {
                dispatch(addNewTabItem());
              }}
            >
              +
            </Grid>
          </Grid>
        </Tabs>
      </AppBar>

      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{
          minHeight: isFullScreen
            ? "calc(500px - 56px - 48px  )"
            : "calc(500px - 50px - 16px  - 48px )",
          height: isFullScreen
            ? "calc(100vh - 56px - 48px )"
            : "calc(100vh - 60px - 50px - 16px - 48px )",
        }}
        id="myResponsiveGridLayout"
      >
        {Object.keys(widgets).map((widgetProps, i) => {
          return (
            <TabPanel
              value={value}
              index={i}
              key={i}
              sx={{
                backgroundColor: "background.main",
                height: "100%",
              }}
            >
              <TabItems widgetname={widgetProps}></TabItems>
            </TabPanel>
          );
        })}
      </SwipeableViews>
    </Box>
  );
}

export default React.memo(MyTabs);
