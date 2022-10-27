import React from "react";

import { IconButton, Grid, Tooltip } from "@mui/material";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const actionIcon = (props) => {
  const defaultFunction = () => {};
  const {
    btnNew = defaultFunction(),
    btnNewIsActive = true,
    dublicate = defaultFunction(),
    dublicateIsActive = true,
    save = defaultFunction(),
    saveIsActive = true,
    btnDelete = defaultFunction(),
    btnDeleteIsActive = true,
    saveGoPrev = defaultFunction(),
    saveGoPrevIsActive = true,
    saveGoNext = defaultFunction(),
    saveGoNextIsActive = true,
    info = defaultFunction(),
    infoIsActive = true,
  } = props;
  const icons = [
    {
      Icon: AddBoxOutlinedIcon,
      tooltip: "New",
      function: btnNew,
      isActive: btnNewIsActive,
    },
    {
      Icon: AddToPhotosOutlinedIcon,
      tooltip: "Duplicate",
      function: dublicate,
      isActive: dublicateIsActive,
    },
    {
      Icon: SaveOutlinedIcon,
      tooltip: "Save",
      function: save,
      isActive: saveIsActive,
    },
    {
      Icon: DeleteOutlineIcon,
      tooltip: "Delete",
      function: btnDelete,
      isActive: btnDeleteIsActive,
    },
    {
      Icon: ArrowCircleLeftOutlinedIcon,
      tooltip: "Save, Go Previous",
      function: saveGoPrev,
      isActive: saveGoPrevIsActive,
    },
    {
      Icon: ArrowCircleRightOutlinedIcon,
      tooltip: "Save, Go Next",
      function: saveGoNext,
      isActive: saveGoNextIsActive,
    },
    {
      Icon: InfoOutlinedIcon,
      tooltip: "Item Info",
      function: info,
      isActive: infoIsActive,
    },
  ];
  return (
    <Grid container sx={{ alignItems: "center" }}>
      {icons.map((Element, key) => (
        <Tooltip
          key={key}
          title={Element.tooltip}
          componentsProps={{
            tooltip: { sx: { backgroundColor: "primary.dark" } },
          }}
          sx={{ display: Element.isActive ? "flex" : "none" }}
        >
          <IconButton
            onClick={() => {
              Element.function();
            }}
          >
            <Element.Icon fontSize="small" sx={{ color: "#4B4B4B" }} />
          </IconButton>
        </Tooltip>
      ))}
    </Grid>
  );
};

export default actionIcon;
