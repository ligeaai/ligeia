import * as React from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
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

function AlertDialog({ Button, DialogBody, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const nodeRef = React.useRef(null);
  const [width, setWidth] = React.useState(905);
  const [height, setHeight] = React.useState(505);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };
  return (
    <Box>
      <Box onClick={handleClickOpen}>{Button}</Box>

      <Dialog
        open={open}
        ref={nodeRef}
        onClose={handleClose}
        maxWidth="xl"
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        PaperProps={{
          sx: {
            overflow: "hidden",
          },
        }}
      >
        <ResizableBox
          width={width}
          height={height}
          resizeHandles={["n", "e", "s", "w", "ne", "sw", "se", "nw"]}
          minConstraints={[700, 500]}
          maxConstraints={[1800, 1500]}
          onResize={handleResize}
          sx={{ overflow: "hidden" }}
        >
          <div>
            <DialogBody handleClose={handleClose} height={height} {...rest} />{" "}
          </div>
        </ResizableBox>
      </Dialog>
    </Box>
  );
}

export default React.memo(AlertDialog);
