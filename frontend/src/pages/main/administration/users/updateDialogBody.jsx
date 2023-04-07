import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { CheckboxList } from "../../../../components";
import { Grid, Box, Button } from "@mui/material";

import { updateUser } from "../../../../services/actions/users/users";

const UpdateDialogBody = ({ handleClose, rowData, ...rest }) => {
  const dispatch = useDispatch();
  const layers = useSelector((state) => state.users.layers);
  const [checked, setChecked] = React.useState(rowData.layer_name);
  function handleToggleFunc(param) {
    setChecked(param);
  }
  return (
    <Box>
      <Box>
        <CheckboxList
          data={layers}
          handleToggleFunc={handleToggleFunc}
          defaultData={checked}
        />
      </Box>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          backgroundColor: "background.main",
          p: 0.5,
        }}
      >
        <Grid
          container
          sx={{
            flexDirection: "row-reverse",
            p: 0.5,
            alignItems: "center",
            height: "100%",
          }}
        >
          <Grid item>
            <Button
              color="inherit"
              onClick={() => {
                handleClose();
              }}
              sx={{ mr: 0.5 }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                dispatch(updateUser({ ...rowData, layer_name: checked }));
                handleClose();
              }}
              variant="outlined"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UpdateDialogBody;
