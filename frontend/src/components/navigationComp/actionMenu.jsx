import React from "react";

import { IconButton, Grid, Tooltip } from "@mui/material";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const actionIcon = (props) => {
  const { deleteChild, deleteParent, saveGoPrev, saveGoNext } = props;
  const icons = [
    { Icon: AddBoxOutlinedIcon, tooltip: "New" },
    { Icon: AddToPhotosOutlinedIcon, tooltip: "Duplicate" },
    { Icon: SaveOutlinedIcon, tooltip: "Save" },
    { Icon: DeleteForeverIcon, tooltip: "Delete All", function: deleteParent },
    { Icon: DeleteOutlineIcon, tooltip: "Delete", function: deleteChild },
    {
      Icon: ArrowCircleLeftOutlinedIcon,
      tooltip: "Save, Go Previous",
      function: saveGoPrev,
    },
    {
      Icon: ArrowCircleRightOutlinedIcon,
      tooltip: "Save, Go Next",
      function: saveGoNext,
    },
    { Icon: InfoOutlinedIcon, tooltip: "Item Info" },
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
