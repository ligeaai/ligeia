import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import CheckList from "./checkList";
import { useDispatch } from "react-redux";
import { cleanCompanyCheckedList } from "../../../../../services/actions/company/checkedList";
function SimpleDialog(props) {
  const dispatch = useDispatch();
  const { onClose, open, data } = props;
  const handleClose = () => {
    onClose();
    dispatch(cleanCompanyCheckedList());
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <CheckList {...props} />
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
