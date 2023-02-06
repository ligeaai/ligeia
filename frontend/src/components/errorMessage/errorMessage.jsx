import React, { useReducer } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const initialState = { isError: false, errMsg: "" };

function reducer(state, action) {
  switch (action.type) {
    case "SHOW_ERROR":
      return { ...state, isError: true, errMsg: action.errMsg };
    case "CLEAN_ERROR":
      return initialState;
    default:
      return state;
  }
}

const ErrorMessage = ({ Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isError, errMsg } = state;

  React.useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAN_ERROR" });
      }, 25000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isError]);

  const closeError = () => {
    dispatch({ type: "CLEAN_ERROR" });
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeError}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Element />
      <Snackbar open={isError} message={errMsg} action={action} />
    </>
  );
};

export default ErrorMessage;


// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Snackbar from "@mui/material/Snackbar";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";

// import { clean_error } from "../../services/actions/error";
// const ErrorMessage = (props) => {
//   const dispatch = useDispatch();
//   const err = useSelector((state) => state.error);
//   const { Element } = props;
//   const errMsgClose = () => {
//     dispatch(clean_error());
//   };
//   React.useEffect(() => {
//     let timer = setTimeout(() => {
//       dispatch({
//         type: "CLEAN_ERROR_SUCCESS",
//       });
//     }, 25000);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [err.isError]);
//   const action = (
//     <React.Fragment>
//       <IconButton
//         size="small"
//         aria-label="close"
//         color="inherit"
//         onClick={errMsgClose}
//       >
//         <CloseIcon fontSize="small" />
//       </IconButton>
//     </React.Fragment>
//   );
//   if (!err.isError) {
//     return <Element />;
//   } else {
//     return (
//       <React.Fragment>
//         <Element />
//         <Snackbar open={true} message={err.errMsg} action={action} />
//       </React.Fragment>
//     );
//   }
// };

// export default ErrorMessage;
