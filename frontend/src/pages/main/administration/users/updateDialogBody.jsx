import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CheckboxList,
  MyRadioButton,
  DialogHeaderHelper,
  FooterHelper,
} from "../../../../components";
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
    <Box className="user-update-pop-up">
      <Box>
        <DialogHeaderHelper text="Update User" />
      </Box>
      <Box className="user-update-pop-up-body">
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
      </Box>
      <Grid container columnSpacing={0.5} className="user-update-pop-up-footer">
        <Grid item>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
            }}
            variant="outlined"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
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
  );
};

export default UpdateDialogBody;
