import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const ErrorMessage = (props) => {
  let { errMsg } = props;

  const [open, setOpen] = useState(false);
  const errMsgClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log(props);
    if (errMsg) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={errMsgClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return <Snackbar open={open} message={errMsg} action={action} />;
};

export default ErrorMessage;
