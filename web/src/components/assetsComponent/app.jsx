import React, { useState } from "react";

// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
import {
  Box,
  Grid,
  Link,
  Collapse,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { menu } from "./menu";
import { hasChildren } from "./utils";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "../../services/reducers/breadcrumbReducer";

export default function App() {
  return menu.map((item, key) => <MenuItem key={key} item={item} />);
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setBreadcrumb(item.url));
  };
  return (
    <ListItem button style={{ marginLeft: "10px" }} onClick={handleClick}>
      {item.icon}
      <Typography
        sx={{
          ml: 1,
          color: "text.primary",
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
  const dispatch = useDispatch();
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    dispatch(setBreadcrumb(item.url));
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        {open ? (
          <ArrowDropUpIcon sx={{ color: "text.primary" }} />
        ) : (
          <ArrowDropDownIcon sx={{ color: "text.primary" }} />
        )}
        <Typography
          sx={{
            ml: 0.5,
            color: "text.primary",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </Typography>
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        style={{ marginLeft: "10px" }}
      >
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
