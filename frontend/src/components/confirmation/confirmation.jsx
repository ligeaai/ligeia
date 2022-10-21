import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { cleanConfirmationState } from "../../services/reducers/confirmation";

export default function AlertDialog() {
  const dispatch = useDispatch();
  const confirmation = useSelector((state) => state.confirmation);

  const handleClose = () => {
    dispatch(cleanConfirmationState());
  };

  return (
    <div>
      <Dialog
        open={confirmation.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{confirmation.title}</DialogTitle>
        <DialogContent>{confirmation.body}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async () => {
              await confirmation.agreefunction();
              handleClose();
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
