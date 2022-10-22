import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Icons from "@mui/icons-material";
import { Box, Collapse, List, ListItem, Typography } from "@mui/material";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { hasChildren } from "./utils";
import history from "../../routers/history";

export default function App({ menu }) {
  return Object.keys(menu.data.drawerMenu).map((item, key) => (
    <MenuItem key={key} item={menu.data.drawerMenu[item]} />
  ));
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const { [item.Icon]: Icon } = Icons;
  const handleClick = () => {
    history.push(item.url);
  };
  return (
    <ListItem
      button
      sx={{
        borderRadius: 2,
        "&:hover": {
          backgroundColor:
            item.url === window.location.pathname
              ? "action.active"
              : "action.hover",
          opacity: "action.hoverOpacity",
        },
        backgroundColor:
          item.url === window.location.pathname ? "action.active" : "inherit",
      }}
      onClick={handleClick}
    >
      {Icon ? (
        <Icon
          sx={{
            color:
              item.url === window.location.pathname
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
            item.url === window.location.pathname
              ? "myReverseText"
              : "myBoldText",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {item.title}
      </Typography>
    </ListItem>
  );
};

const MultiLevel = ({ item }) => {
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const { items: children } = item;
  const { [item.Icon]: Icon } = Icons;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [isOpen]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem
        button
        onClick={handleClick}
        sx={{ borderRadius: 2, position: "relative" }}
      >
        {Icon ? (
          <Icon
            sx={{
              color:
                item.url === window.location.pathname
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
              item.url === window.location.pathname
                ? "myReverseText"
                : "myBoldText",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </Typography>

        {open ? (
          <ArrowDropUpIcon
            sx={{
              position: "absolute",
              right: "0px",
              mr: 1,
              color:
                item.url === window.location.pathname
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
                item.url === window.location.pathname
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
