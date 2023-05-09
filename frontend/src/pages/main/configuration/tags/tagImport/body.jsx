import React from "react";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function LinearProgressWithLabel(props) {
  return (
    <Box className="tag-import-container__property-box__progress-bar__box">
      <Box className="tag-import-container__property-box__progress-bar__box__linear-progress">
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box className="tag-import-container__property-box__progress-bar__box__percent">
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const Body = () => {
  const log = useSelector((state) => state.tagImport.data);
  const progress = useSelector((state) => state.tagImport.percent);

  return (
    log.length > 0 && (
      <React.Fragment>
        <Box className="tag-import-container__property-box__progress-bar">
          <LinearProgressWithLabel value={progress} />
        </Box>

        <Box className="tag-import-container__property-box__logs">
          <Grid container rowGap={0.5}>
            {log.map((e) => {
              return (
                <Grid item xs={12}>
                  {e}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </React.Fragment>
    )
  );
};

export default Body;
