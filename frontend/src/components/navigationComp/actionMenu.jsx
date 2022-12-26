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
  const defaultFunction = () => { };
  const {
    btnNew = defaultFunction,
    btnNewIsActive = true,
    btnNewIsDisabled = false,
    dublicate = defaultFunction,
    dublicateIsActive = true,
    dublicateIsDisabled = false,
    save = defaultFunction,
    saveIsActive = true,
    saveIsDisabled = false,
    btnDelete = defaultFunction,
    btnDeleteIsActive = true,
    btnDeleteIsDisabled = false,
    saveGoPrev = defaultFunction,
    saveGoPrevIsActive = true,
    saveGoPrevIsDisabled = false,
    saveGoNext = defaultFunction,
    saveGoNextIsActive = true,
    saveGoNextIsDisabled = false,
    info = defaultFunction,
    infoIsActive = true,
    infoIsDisabled = false,
  } = props;
  const icons = [
    {
      Icon: AddBoxOutlinedIcon,
      tooltip: "New",
      function: btnNew,
      isActive: btnNewIsActive,
      isDisabled: btnNewIsDisabled,
    },
    {
      Icon: AddToPhotosOutlinedIcon,
      tooltip: "Duplicate",
      function: dublicate,
      isActive: dublicateIsActive,
      isDisabled: dublicateIsDisabled,
    },
    {
      Icon: SaveOutlinedIcon,
      tooltip: "Save",
      function: save,
      isActive: saveIsActive,
      isDisabled: saveIsDisabled,
    },
    {
      Icon: DeleteOutlineIcon,
      tooltip: "Delete",
      function: btnDelete,
      isActive: btnDeleteIsActive,
      isDisabled: btnDeleteIsDisabled,
    },
    {
      Icon: ArrowCircleLeftOutlinedIcon,
      tooltip: "Save, Go Previous",
      function: saveGoPrev,
      isActive: saveGoPrevIsActive,
      isDisabled: saveGoPrevIsDisabled,
    },
    {
      Icon: ArrowCircleRightOutlinedIcon,
      tooltip: "Save, Go Next",
      function: saveGoNext,
      isActive: saveGoNextIsActive,
      isDisabled: saveGoNextIsDisabled,
    },
    {
      Icon: InfoOutlinedIcon,
      tooltip: "Item Info",
      function: info,
      isActive: infoIsActive,
      isDisabled: infoIsDisabled,
    },
  ];
  return (
    <Grid container sx={{ alignItems: "center" }}>
      {icons.map((Element, key) => {
        if (!Element.isDisabled) {
          return (
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
          );
        } else {
          return (
            <IconButton disabled={true} key={key}>
              <Element.Icon fontSize="small" />
            </IconButton>
          );
        }
      })}
    </Grid>
  );
};

export default actionIcon;
