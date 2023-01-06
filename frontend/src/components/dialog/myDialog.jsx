import * as React from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={nodeRef}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export default function AlertDialog({ Button, DialogBody, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const nodeRef = React.useRef(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box onClick={handleClickOpen}>{Button}</Box>

      <Dialog
        open={open}
        ref={nodeRef}
        onClose={handleClose}
        maxWidth="lg"
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogBody handleClose={handleClose} {...rest} />
      </Dialog>
    </Box>
  );
}
