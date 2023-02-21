import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

import { clean_error } from "../../services/actions/error";
const ErrorMessage = (props) => {
  const dispatch = useDispatch();
  const err = useSelector((state) => state.error);
  const { Element } = props;
  const errMsgClose = () => {
    dispatch(clean_error());
  };
  React.useEffect(() => {
    let timer = setTimeout(() => {
      dispatch({
        type: "CLEAN_ERROR_SUCCESS",
      });
    }, 25000);

    return () => {
      clearTimeout(timer);
    };
  }, [err.isError]);

  if (!err.isError) {
    return <Element />;
  } else {
    return (
      <React.Fragment>
        <Element />
        <Snackbar open={true}>
          <Alert onClose={errMsgClose} severity="error" sx={{ width: "100%" }}>
            {err.errMsg}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
};

export default ErrorMessage;
