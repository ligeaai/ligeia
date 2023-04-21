import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { CheckboxList, MyRadioButton } from "../../../../components";
import { Grid, Box, Button } from "@mui/material";

import { updateUser } from "../../../../services/actions/users/users";
import Roles from "../../../../services/api/roles";
import { isUpdated } from "../../../../services/utils/permissions";

const UpdateDialogBody = ({ handleClose, rowData, ...rest }) => {
  const dispatch = useDispatch();
  const layers = useSelector((state) => state.users.layers);
  const [checked, setChecked] = React.useState(
    rowData.layer_name.map((e) => e.LAYER_NAME)
  );
  const [roles, setRoles] = React.useState([]);
  const [checkedRoles, setCheckedRoles] = React.useState(
    rowData?.role?.ROLES_ID
  );
  function handleToggleFunc(param) {
    setChecked(param);
  }

  function handleToggleRole(param) {
    setCheckedRoles(param);
  }
  React.useEffect(() => {
    async function myFunc() {
      let res = await Roles.getRoles();
      setRoles(res.data);
    }

    myFunc();
  }, []);
  return (
    <Box sx={{ overflow: "scroll", height: "100%" }}>
      Roles
      <Box>
        <MyRadioButton
          data={roles}
          dataTextPath="ROLES_NAME"
          dataValuePath="ROLES_ID"
          handleToggleFunc={handleToggleRole}
          defaultData={checkedRoles}
        />
      </Box>
      Layers
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
                dispatch(
                  updateUser({
                    ...rowData,
                    role: checkedRoles ? checkedRoles : null,
                    layer_name: checked,
                  })
                );
                handleClose();
              }}
              disabled={!dispatch(isUpdated("USERS"))}
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
