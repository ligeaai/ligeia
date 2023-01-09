import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "@mui/icons-material";
import { Box, Collapse, List, ListItem, Typography } from "@mui/material";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { hasChildren } from "./utils";
import history from "../../routers/history";

import {
  setSelectedDrawerItem,
  setOpenTab,
} from "../../services/actions/drawerMenu/drawerMenu";
import { useParams } from "react-router-dom";

import { confirmationPushHistory } from "../../services/utils/historyPush";
import { setGoFunctionConfirmation } from "../../services/actions/confirmation/historyConfirmation";

function App({ menu }) {
  return Object.keys(menu).map((item, key) => (
    <MenuItem key={key} item={menu[item]} url="/" />
  ));
}

const MenuItem = ({ item, url }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} url={url} />;
};

const SingleLevel = ({ item, url }) => {
  url = url + item.SHORT_LABEL.toLowerCase();
  url = url.replace(/ /g, "_");
  if (url === "/home") {
    url = "/";
  }
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawerMenu.isOpen);
  const { [item.ICON]: Icon } = Icons;
  var selectedItem = useSelector(
    (state) => state.drawerMenu.selectedItem.SHORT_LABEL
  );

  const handleClick = () => {
    function goFunction() {
      dispatch(setSelectedDrawerItem(item));
      history.push(`${url}`);
    }
    dispatch(setGoFunctionConfirmation(goFunction));
    dispatch(confirmationPushHistory());
  };
  return (
    <ListItem
      button
      sx={{
        borderRadius: 2,
        "&:hover": {
          backgroundColor:
            item.SHORT_LABEL === selectedItem
              ? "hover.primary"
              : "action.hover",
          opacity: "action.hoverOpacity",
        },
        backgroundColor:
          item.SHORT_LABEL === selectedItem ? "background.primary" : "inherit",
      }}
      onClick={handleClick}
    >
      {Icon ? (
        <Icon
          sx={{
            color:
              item.SHORT_LABEL === selectedItem
                ? "text.main" //iconun seçili hali
                : "text.primary", // iconun rengi
          }}
        />
      ) : (
        <Box sx={{ width: "24px" }}></Box>
      )}
      <Typography
        variant="subtitle2"
        sx={{
          mx: 1,
          pl: 0.5,
          display: isOpen ? "inline-block" : "none",
          color:
            item.SHORT_LABEL === selectedItem ? "text.main" : "text.primary", //textin rengi
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {item.SHORT_LABEL}
      </Typography>
    </ListItem>
  );
};

const MultiLevel = ({ item, url }) => {
  const dispatch = useDispatch();
  url = url + item.SHORT_LABEL.toLowerCase() + "/";
  const { params } = useParams();
  const isOpen = useSelector((state) => state.drawerMenu.isOpen);
  const isOpenTab = useSelector((state) => state.drawerMenu.openTabs[item.id]);
  const { Items: children } = item;
  const { [item.ICON]: Icon } = Icons;

  const handleClick = () => {
    if (isOpen) {
      //setOpen((prev) => !prev);
      dispatch(setOpenTab(item.id));
    }
    //dispatch(setSelectedDrawerItem(item.SHORT_LABEL));
    //   history.push(`${item.URL}`);
  };
  return (
    <React.Fragment>
      <ListItem
        button
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          position: "relative",
          "&:hover": {
            backgroundColor:
              url.slice(0, -1) === window.location.pathname
                ? "hover.primary"
                : "action.hover",
            opacity: "action.hoverOpacity",
          },
          backgroundColor:
            url.slice(0, -1) === window.location.pathname
              ? "action.active"
              : "inherit",
        }}
      >
        {Icon ? (
          <Icon
            sx={{
              color:
                url.slice(0, -1) === window.location.pathname
                  ? "text.main"
                  : "text.primary",
            }}
          />
        ) : (
          <Box sx={{ width: "24px" }}></Box>
        )}

        <Typography
          variant="subtitle2"
          sx={{
            mx: 0.5,
            pl: 1,
            display: isOpen ? "inline-block" : "none",
            color:
              url.slice(0, -1) === window.location.pathname
                ? "myReverseText"
                : "text.primary",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {item.SHORT_LABEL}
        </Typography>

        {isOpenTab && isOpen ? (
          <ArrowDropUpIcon
            sx={{
              position: "absolute",
              right: "0px",
              mr: 1,
              color:
                url.slice(0, -1) === window.location.pathname
                  ? "text.main"
                  : "text.primary",
              typography: "body1",
              display: isOpen ? "inline-block" : "none",
            }}
          />
        ) : (
          <ArrowDropDownIcon
            sx={{
              position: "absolute",
              right: "0px",
              mr: 1,
              color:
                url.slice(0, -1) === window.location.pathname
                  ? "text.main"
                  : "text.primary",
              typography: "body1",
              display: isOpen ? "inline-block" : "none",
            }}
          />
        )}
      </ListItem>
      <Collapse
        in={isOpenTab && isOpen}
        timeout="auto"
        unmountOnExit
        // style={{ marginLeft: "10px" }}
      >
        <List component="div" disablePadding>
          {Object.keys(children).map((child, key) => (
            <MenuItem key={key} item={children[child]} url={url} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default App;
