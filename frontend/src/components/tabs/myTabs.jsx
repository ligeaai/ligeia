import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import ClearIcon from "@mui/icons-material/Clear";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import TabItems from "../../layout/main/overview/tabItems";
import {
  selectTab,
  addNewTabItem,
  updateTabHeader,
  deleteTapHeader,
} from "../../services/actions/overview/taps";
import { MyTextField } from "..";
import { setConfirmation } from "../../services/reducers/confirmation";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useIsMount } from "../../hooks/useIsMount";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      className="overview-container__tab-box__tab-body__tab-panel"
      {...other}
    >
      {value === index && <>{children}</>}
    </Box>
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

const MyTap = React.forwardRef(
  ({ x, i, handleChange, active, ...rest }, ref) => {
    const [changeText, setChangeText] = React.useState(false);
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
          className={`overview-container__tab-box__tab-header__tabs__item ${
            active === i
              ? "overview-container__tab-box__tab-header__tabs__item__active"
              : ""
          }`}
        >
          <Tab
            ref={ref}
            label={`${x}`}
            {...a11yProps(i)}
            {...rest}
            className={`overview-container__tab-box__tab-header__tabs__item__text ${
              active === i
                ? "overview-container__tab-box__tab-header__tabs__item__active__text"
                : ""
            }`}
            sx={{
              width: "max-content",
              maxWidth: "150px",
              textTransform: "capitalize",
              fontSize: "12px",
            }}
            onDoubleClick={() => {
              setChangeText(true);
            }}
          />
          <ClearIcon
            fontSize="small"
            sx={{
              cursor: "pointer",
              fill: "red",
            }}
            onClick={() => {
              dispatch(
                setConfirmation({
                  title: "Are you sure you want to delete ?",
                  body: <>{x} </>,
                  agreefunction: () => {
                    dispatch(deleteTapHeader(x));
                    handleChange(0);
                  },
                })
              );
            }}
          ></ClearIcon>
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
  }
);
function MyTabs() {
  const isMount = useIsMount();
  const ref = React.createRef();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(null);
  const titles = useSelector((state) => state.tapsOverview.titles);
  const widgets = useSelector((state) => state.tapsOverview.widgets);
  const selected = useSelector((state) => state.tapsOverview.selected);
  const menuSelectedItem = useSelector(
    (state) => state.collapseMenu.selectedItem.path
  );
  React.useEffect(() => {
    Object.keys(widgets).map((e, i) => {
      if (e === selected) {
        setValue(i);
      }
    });
  }, [selected]);
  React.useEffect(() => {
    if (!isMount) {
      setValue(null);
    }
  }, [menuSelectedItem]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(selectTab(Object.keys(widgets)[newValue]));
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <AppBar className="overview-container__tab-box__tab-header">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="action tabs example"
          variant="scrollable"
          indicatorColor="none"
          scrollButtons="auto"
          //textColor="inherit"
          className="overview-container__tab-box__tab-header__tabs"
        >
          {titles.map((x, i) => {
            return (
              <MyTap
                ref={ref}
                key={`${x}`}
                x={x}
                i={i}
                active={value}
                handleChange={handleChange}
              ></MyTap>
            );
          })}
          <Grid item>
            <IconButton
              variant="outlined"
              sx={{
                maxHeight: "30px",
                width: "30px",
                mt: "2px",
                //border: "1px solid #ffffff",
              }}
              key="a"
              onClick={() => {
                dispatch(addNewTabItem());
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Tabs>
      </AppBar>
      <Box className="overview-container__tab-box__tab-body">
        <SwipeableViews
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{ height: "100%" }}
        >
          {Object.keys(widgets).map((widgetProps, i) => {
            return (
              <TabPanel value={value} index={i} key={i}>
                <TabItems widgetname={widgetProps}></TabItems>
              </TabPanel>
            );
          })}
        </SwipeableViews>
      </Box>
    </>
  );
}

export default React.memo(MyTabs);
