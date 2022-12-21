import * as React from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";

export default function AlertDialog({ Button, DialogBody, ...rest }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box onClick={handleClickOpen}>{Button}</Box>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogBody handleClose={handleClose} {...rest} />
      </Dialog>
    </Box>
  );
}
