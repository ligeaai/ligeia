import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { CheckboxList } from "../../../../../components";
import { Grid, Box, Button } from "@mui/material";

import Roles from "../../../../../services/api/roles";

import { saveRoleLink } from "../../../../../services/actions/roles/link";

const AddRolePopUp = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [checked, setChecked] = React.useState("");
  function handleToggleFunc(param) {
    setChecked(param);
  }
  React.useEffect(() => {
    async function myFunc() {
      try {
        let res = await Roles.getRolelessUser();
        res.data.map((e) => {
          e["full_name"] =
            e.first_name + " " + e.last_name + "(" + e.email + ")";
        });
        setData(res.data);
      } catch {}
    }

    myFunc();
  }, []);
  return (
    <Box>
      <Box>
        <CheckboxList
          data={data}
          dataTextPath={"full_name"}
          handleToggleFunc={handleToggleFunc}
          defaultData={checked}
        />
      </Box>

      <Grid container columnSpacing={0.5} className="add-role-pop-up">
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
              dispatch(saveRoleLink(checked));
              handleClose();
            }}
            variant="outlined"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddRolePopUp;
