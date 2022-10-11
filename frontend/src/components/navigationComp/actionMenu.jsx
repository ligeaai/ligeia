import React from "react";

import { IconButton, Grid, Tooltip } from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import ControlPointDuplicateRoundedIcon from "@mui/icons-material/ControlPointDuplicateRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const icons = [
  { Icon: ControlPointRoundedIcon, tooltip: "New" },
  { Icon: ControlPointDuplicateRoundedIcon, tooltip: "Duplicate" },
  { Icon: SaveOutlinedIcon, tooltip: "Save" },
  { Icon: DeleteOutlineOutlinedIcon, tooltip: "Delete" },
  { Icon: ArrowCircleLeftOutlinedIcon, tooltip: "Save, Go Previous" },
  { Icon: ArrowCircleRightOutlinedIcon, tooltip: "Save, Go Next" },
  { Icon: InfoOutlinedIcon, tooltip: "Item Info" },
];

const actionIcon = () => {
  return (
    <Grid container>
      {icons.map((Element, key) => (
        <Tooltip key={key} title={Element.tooltip}>
          <IconButton>
            <Element.Icon sx={{ color: "text.primary" }} />
          </IconButton>
        </Tooltip>
      ))}
    </Grid>
  );
};

export default actionIcon;
