import React from "react";
import { Grid, Button } from "@mui/material";
const footerHelper = ({ handleClose = () => {}, handleSave = () => {} }) => {
  return (
    <Grid
      container
      columnSpacing={0.5}
      className="dialog-container__paper__footer"
    >
      <Grid item>
        <Button
          color="inherit"
          onClick={() => {
            handleClose();
          }}
          variant="outlined"
        >
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button
          type="submit"
          color="inherit"
          onClick={() => {
            handleSave();
          }}
          variant="outlined"
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default footerHelper;
