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

import { hasChildren } from "./utils";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "../../services/reducers/breadcrumbReducer";

export default function App({ menu }) {
  return menu.map((item, key) => (
    <MenuItem key={key} item={item} propsOpenAll={false} />
  ));
}

const MenuItem = ({ item, propsOpenAll }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} propsOpenAll={propsOpenAll} />;
};

const SingleLevel = ({ item }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setBreadcrumb(item.url));
  };
  return (
    <ListItem
      button
      sx={{ marginLeft: "10px", typography: "body2" }}
      onClick={handleClick}
    >
      {item.icon}
      <Typography
        variant="body2"
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

const MultiLevel = ({ item, propsOpenAll }) => {
  const dispatch = useDispatch();
  const { items: children } = item;
  const [open, setOpen] = useState(propsOpenAll);
  const [openAll, setOpenAll] = useState(propsOpenAll);

  const handleClick = (e) => {
    dispatch(setBreadcrumb(item.url));
    setOpen((prev) => !prev);
    setOpenAll(false);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        {open ? (
          <ArrowDropUpIcon sx={{ color: "text.primary", typography: "h6" }} />
        ) : (
          <ArrowDropDownIcon
            sx={{ color: "text.primary", typography: "h6" }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setBreadcrumb(item.url));
              setOpenAll(true);
              setOpen((prev) => !prev);
            }}
          />
        )}
        <Typography
          variant="subtitle2"
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
            <MenuItem key={key} item={child} propsOpenAll={openAll} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
