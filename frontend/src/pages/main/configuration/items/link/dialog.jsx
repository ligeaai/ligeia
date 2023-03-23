import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import CheckList from "./checkList";
import { useDispatch } from "react-redux";
import { cleanCompanyCheckedList } from "../../../../../services/actions/item/checkedList";
import { Typography } from "@mui/material";

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

function SimpleDialog(props) {
  const dispatch = useDispatch();
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
    dispatch(cleanCompanyCheckedList());
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      sx={{
        ".MuiDialog-paper": {
          width: "500px",
        },
      }}
    >
      <CheckList {...props} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  dataSelectItemPath: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    dispatch(cleanCompanyCheckedList());
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Typography sx={{ color: "primary.main" }}>New</Typography>
      </Button>
      <SimpleDialog open={open} onClose={handleClose} {...props} />
    </div>
  );
}
