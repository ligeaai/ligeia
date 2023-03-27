import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import Dialog from "./dialog";
import Links from "./links";
const LinkItem = ({ e, i, type, connection }) => {
  const [refresh, setRefresh] = React.useState(false);
  const refreshHandle = () => {
    setRefresh((prev) => !prev);
  };
  return (
    <Box key={i}>
      <Divider sx={{ backgroundColor: "primary.main" }} />
      <Box sx={{ p: 1 }}>
        <Box sx={{ mb: 1, fontSize: "14px", fontWeight: "bold" }}>
          {e.SHORT_LABEL}
        </Box>
        <Box>
          {e.TYPE === "TAG_ITEM" ? (
            <></>
          ) : (
            <Dialog data={e} type={type} refreshHandle={refreshHandle} />
          )}
        </Box>
      </Box>
      <Grid container spacing={1} sx={{ p: 1, pt: 0 }}>
        <Links linkType={e.TYPE} connection={connection} refresh={refresh} />
      </Grid>
    </Box>
  );
};

export default LinkItem;
