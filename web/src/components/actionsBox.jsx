import React from "react";
import { Grid } from "@mui/material";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import SaveIcon from "@mui/icons-material/Save";

import BarChartIcon from "@mui/icons-material/BarChart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
const boxItems = [
  {
    icon: <NoteAddOutlinedIcon />,
    text: "New",
  },
  {
    icon: <QuestionMarkIcon />,
    text: "Dublicate",
  },
  {
    icon: <InfoRoundedIcon />,
    text: "Item Info",
  },
  {
    icon: <SaveIcon />,
    text: "Save",
  },
  {
    icon: <QuestionMarkIcon />,
    text: "Save,Go Previous",
  },

  {
    icon: <BarChartIcon />,
    text: "Edit Chart",
  },
  {
    icon: <DeleteForeverIcon />,
    text: "Delete",
  },
  {
    icon: <QuestionMarkIcon />,
    text: "Save,Go Next",
  },
  {
    icon: <QuestionMarkIcon />,
    text: "Edit Validators",
  },
];

const actionsBox = () => {
  return (
    <Grid
      container
      spacing={1}
      sx={{ width: "520px", border: "1px solid #ccc", p: 1, m: 1 }}
    >
      {boxItems.map((e) => (
        <Grid item xs={4}>
          <Grid container spacing={1} sx={{ color: "text.primary" }}>
            <Grid item>{e.icon}</Grid>
            <Grid item>{e.text}</Grid>
          </Grid>
        </Grid>
      ))}
      <Grid xs={12} sx={{ color: "text.primary", textAlign: "center" }}>
        Action
      </Grid>
    </Grid>
  );
};

export default actionsBox;
