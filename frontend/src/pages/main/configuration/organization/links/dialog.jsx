import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import TransferList from "./transferList";

function SimpleDialog(props) {
  const { onClose, open, data } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <TransferList props={data} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,

  data: PropTypes.object.isRequired,
};

export default function SimpleDialogDemo({ props }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New
      </Button>
      <SimpleDialog open={open} onClose={handleClose} data={props} />
    </div>
  );
}
