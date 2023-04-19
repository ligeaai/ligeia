import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Grid,
  TextField,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

import { MyTextField, Select } from "../../../../components";
import { instance, config } from "../../../../services/baseApi";
import ClearIcon from "@mui/icons-material/Clear";
import {
  changeProjectValue,
  cleanProjectReducer,
} from "../../../../services/actions/project/project";

const Layers = (props) => {
  const { path, stateWay, text } = props;
  const dispatch = useDispatch();
  const [values, setLayerValues] = React.useState([]);
  const selectedItem = useSelector((state) => state.project[stateWay]);
  const [defaultVal, setDefaultVal] = React.useState("");
  React.useEffect(() => {
    const myFunc = async () => {
      try {
        let res = await instance.get(`${path}`, config());
        var myRes = [""];
        stateWay === "LAYERS"
          ? res.data.map((e) => {
              myRes.push(e.LAYER_NAME);
            })
          : console.log(res);
        res.data.Message.map((e) => {
          myRes.push(e.CULTURE);
        });
        setLayerValues([...myRes]);
      } catch {}
    };
    myFunc();
  }, []);
  const handleChangeFunc = (event) => {
    if (event !== "") {
      setDefaultVal("");
      dispatch(changeProjectValue(stateWay, [...selectedItem, event]));
      setLayerValues([...values.filter((e) => e !== event)]);
    }
  };

  const deleteSelectedItem = (event) => {
    setLayerValues([...values, event]);
    dispatch(
      changeProjectValue(stateWay, [...selectedItem.filter((e) => e !== event)])
    );
  };
  return (
    <Grid item xs={12} className={"project-container__body__row"}>
      <Grid container className={"project-container__body__select-box"}>
        <Grid item className={"project-container__body__label"}>
          {text}:
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              {selectedItem.map((e) => {
                return (
                  <Box>
                    <IconButton
                      onClick={() => {
                        deleteSelectedItem(e);
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                    <span>{e}</span>
                    <br />
                  </Box>
                );
              })}
            </Grid>
            <Grid item>
              <Select
                values={values}
                defaultValue={defaultVal}
                handleChangeFunc={handleChangeFunc}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
const ConnectionString = () => {
  const defaultStr =
    "Network Library=DBMSSOCN;Data Source=localhost,1433;Initial Catalog?alpha;User ID=sa;Password=Gas2013+;Applicatıon Name=AVM";
  const dispatch = useDispatch();
  const value = useSelector((state) => state.project.CONNECTION_STRING);
  const handleChange = (e) => {
    dispatch(changeProjectValue("CONNECTION_STRING", e.target.value));
  };
  return (
    <Grid item xs={12} className={"project-container__body__row"}>
      <Grid container className={"project-container__body__select-box"}>
        <Grid item className={"project-container__body__label"}>
          Connection String
        </Grid>
        <Grid item className={"project-container__body__field"}>
          <TextField
            multiline
            maxRows={4}
            className={"project-container__body__textfield"}
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button
            size={"small"}
            onClick={() => {
              dispatch(changeProjectValue("CONNECTION_STRING", defaultStr));
            }}
          >
            Get Provider Default
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
const DatabaseCreationFile = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.project.DATABASE_CREATE_FILE);
  const handleChange = (e) => {
    dispatch(changeProjectValue("DATABASE_CREATE_FILE", e.target.value));
  };
  return (
    <Grid item xs={12} className={"project-container__body__row"}>
      <Grid container className={"project-container__body__select-box"}>
        <Grid item className={"project-container__body__label"}>
          Database creation File
        </Grid>
        <Grid item className={"project-container__body__field"}>
          <TextField
            className={"project-container__body__textfield"}
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button component="label" onChange={handleChange}>
            ...
            <input type="file" hidden />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
const ImplementationName = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.project.IMPLEMENTATION_NAME);
  const handleChange = (e) => {
    dispatch(changeProjectValue("IMPLEMENTATION_NAME", e));
  };
  return (
    <Grid item xs={12} className={"project-container__body__row"}>
      <Grid container className={"project-container__body__select-box"}>
        <Grid item className={"project-container__body__label"}>
          Implementation Name:
        </Grid>
        <Grid item>
          <MyTextField defaultValue={value} handleChangeFunc={handleChange} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const UnitSystem = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.project.UNIT_SYSTEM);
  const handleChange = (e) => {
    dispatch(changeProjectValue("UNIT_SYSTEM", e));
  };
  return (
    <Grid item xs={12} className={"project-container__body__row"}>
      <Grid container className={"project-container__body__select-box"}>
        <Grid item className={"project-container__body__label"}>
          Unit System:
        </Grid>
        <Grid item>
          <Select
            values={["", "Metric", "Imperial"]}
            defaultValue={value}
            handleChangeFunc={handleChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
const ProjectEditor = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      dispatch(cleanProjectReducer());
    };
  }, []);
  return (
    <Grid container>
      <Grid item xs={12} className={"project-container__body__row"}>
        <Grid container className={"project-container__body__select-box"}>
          <Grid item className={"project-container__body__label"}>
            Data source:
          </Grid>
          <Grid item>
            <Select values={["Postgre Sql"]} defaultValue={"Postgre Sql"} />
          </Grid>
        </Grid>
      </Grid>
      <ConnectionString />
      <DatabaseCreationFile />
      <ImplementationName />
      <Typography className={"project-container__body__select-box"}>
        <Layers
          key={"Cultures"}
          path="/code-list/culture/"
          stateWay="CULTURES"
          text="Cultures"
        />
        <Layers
          key={"Layers"}
          path="/layer/layer-dropdown/"
          stateWay="LAYERS"
          text="Layers"
        />
      </Typography>
      <UnitSystem />
      <Grid item>
        <Button
          variant="contained"
          className="project-container__body__btn-save"
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProjectEditor;
