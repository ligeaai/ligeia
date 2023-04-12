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
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          bottom: 0,
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
    </Box>
  );
};

export default AddRolePopUp;
