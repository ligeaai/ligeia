import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { clean_error } from "../../services/actions/error";
const ErrorMessage = (props) => {
  const dispatch = useDispatch();
  const err = useSelector((state) => state.error);
  const { Element } = props;
  const errMsgClose = () => {
    dispatch(clean_error());
  };
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
  if (!err.isError) {
    return <Element />;
  } else {
    return (
      <React.Fragment>
        <Element />
        <Snackbar open={true} message={err.errMsg} action={action} />
      </React.Fragment>
    );
  }
};

export default ErrorMessage;
