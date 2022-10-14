import React from "react";

import { IconButton, Grid, Tooltip } from "@mui/material";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const icons = [
  { Icon: AddBoxOutlinedIcon, tooltip: "New" },
  { Icon: AddToPhotosOutlinedIcon, tooltip: "Duplicate" },
  { Icon: SaveOutlinedIcon, tooltip: "Save" },
  { Icon: DeleteOutlineIcon, tooltip: "Delete" },
  { Icon: ArrowCircleLeftOutlinedIcon, tooltip: "Save, Go Previous" },
  { Icon: ArrowCircleRightOutlinedIcon, tooltip: "Save, Go Next" },
  { Icon: InfoOutlinedIcon, tooltip: "Item Info" },
];

const actionIcon = () => {
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
          <IconButton>
            <Element.Icon fontSize="small" sx={{ color: "#4B4B4B" }} />
          </IconButton>
        </Tooltip>
      ))}
    </Grid>
  );
};

export default actionIcon;
