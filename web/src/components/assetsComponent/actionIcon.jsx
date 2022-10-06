import React from "react";

import { Grid } from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import ControlPointDuplicateRoundedIcon from "@mui/icons-material/ControlPointDuplicateRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const icons = [
  ControlPointRoundedIcon,
  ControlPointDuplicateRoundedIcon,
  SaveOutlinedIcon,
  DeleteOutlineOutlinedIcon,
  ArrowCircleLeftOutlinedIcon,
  ArrowCircleRightOutlinedIcon,
  InfoOutlinedIcon,
];

const actionIcon = () => {
  return (
    <Grid container columnGap={1.5}>
      {icons.map((Element, key) => (
        <Element key={key} sx={{ color: "white" }} />
      ))}
    </Grid>
  );
};

export default actionIcon;
