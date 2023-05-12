import React from "react";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  openWebSocket,
  closeWebSocket,
} from "../../../../../services/actions/tagImport/tagImport";
function LinearProgressWithLabel(props) {
  return (
    <Box className="tag-manager-container__body__property-box__prop-item__progress-bar__box">
      <Box className="tag-manager-container__body__property-box__prop-item__progress-bar__box__linear-progress">
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box className="tag-manager-container__body__property-box__prop-item__progress-bar__box__percent">
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const Body = () => {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.tagImport.data);
  const progress = useSelector((state) => state.tagImport.percent);
  const lock = useSelector((state) => state.tagImport.lock);
  React.useEffect(() => {
    dispatch(openWebSocket());
    return () => {
      dispatch(closeWebSocket());
      dispatch({
        type: "TOGGLE_LOCK_TAG_IMPORT",
        payload: false,
      });
    };
  }, []);
  return (
    lock && (
      <Box className="tag-manager-container__body__property-box__prop-item">
        {progress && (
          <Box className="tag-manager-container__body__property-box__prop-item__progress-bar">
            <LinearProgressWithLabel value={progress} />
          </Box>
        )}

        <Box className="tag-manager-container__body__property-box__prop-item__logs">
          <Grid container rowGap={0.5}>
            {log.map((e, i) => {
              return (
                <Grid item key={i} xs={12}>
                  {e}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    )
  );
};

export default Body;
