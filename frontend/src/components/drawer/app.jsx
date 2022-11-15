import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "@mui/icons-material";
import { Box, Collapse, List, ListItem, Typography } from "@mui/material";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { hasChildren } from "./utils";
import history from "../../routers/history";

import { setSelectedDrawerItem } from "../../services/actions/drawerMenu/drawerMenu";

export default function App({ menu }) {
  return Object.keys(menu).map((item, key) => (
    <MenuItem key={key} item={menu[item]} />
  ));
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawerMenu.isOpen);
  const { [item.ICON]: Icon } = Icons;
  const selectedItem = useSelector((state) => state.drawerMenu.selectedItem);
  const handleClick = () => {
    dispatch(setSelectedDrawerItem(item.SHORT_LABEL));
    history.push(`${item.URL}`);
  };
  return (
    <ListItem
      button
      sx={{
        borderRadius: 2,
        "&:hover": {
          backgroundColor:
            item.SHORT_LABEL === selectedItem
              ? "action.active"
              : "action.hover",
          opacity: "action.hoverOpacity",
        },
        backgroundColor:
          item.SHORT_LABEL === selectedItem ? "action.active" : "inherit",
      }}
      onClick={handleClick}
    >
      {Icon ? (
        <Icon
          sx={{
            color:
              item.SHORT_LABEL === selectedItem
                ? "myReverseText"
                : "myBoldText",
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
            item.SHORT_LABEL === selectedItem ? "myReverseText" : "myBoldText",
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

const MultiLevel = ({ item }) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.drawerMenu.selectedItem);
  const isOpen = useSelector((state) => state.drawerMenu.isOpen);
  const { Items: children } = item;
  const { [item.ICON]: Icon } = Icons;

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isOpen]);

  const handleClick = () => {
    if (isOpen) {
      setOpen((prev) => !prev);
    }
    dispatch(setSelectedDrawerItem(item.SHORT_LABEL));
    history.push(`${item.URL}`);
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
              item.SHORT_LABEL === selectedItem
                ? "action.active"
                : "action.hover",
            opacity: "action.hoverOpacity",
          },
          backgroundColor:
            item.SHORT_LABEL === selectedItem ? "action.active" : "inherit",
        }}
      >
        {Icon ? (
          <Icon
            sx={{
              color:
                item.SHORT_LABEL === selectedItem
                  ? "myReverseText"
                  : "myBoldText",
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
              item.SHORT_LABEL === selectedItem
                ? "myReverseText"
                : "myBoldText",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {item.SHORT_LABEL}
        </Typography>

        {open ? (
          <ArrowDropUpIcon
            sx={{
              position: "absolute",
              right: "0px",
              mr: 1,
              color:
                item.SHORT_LABEL === selectedItem
                  ? "myReverseText"
                  : "myBoldText",
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
                item.SHORT_LABEL === selectedItem
                  ? "myReverseText"
                  : "myBoldText",
              typography: "body1",
              display: isOpen ? "inline-block" : "none",
            }}
          />
        )}
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        // style={{ marginLeft: "10px" }}
      >
        <List component="div" disablePadding>
          {Object.keys(children).map((child, key) => (
            <MenuItem key={key} item={children[child]} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
