import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MyBox, MyCheckBox, MyTextField, Select } from "../../../../components";
import { makeStyles } from "@mui/styles";
import { width } from "@mui/system";
import { instance, config } from "../../../../services/baseApi";
import { grey } from "@mui/material/colors";

import {
  changeProjectValue,
  cleanProjectReducer,
} from "../../../../services/actions/project/project";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  selectBox: {
    alignItems: "center",
  },
  label: {
    width: "180px",
  },
  field: {
    width: "calc(100% - 396px)",
  },
  row: {
    paddingBottom: "12px",
  },
  textfield: {
    fontSize: "14px",
    width: "100%",
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
      paddingTop: "4px",
      paddingBottom: "4px",
    },
    "& .MuiInputBase-root": {
      fontSize: "14px",
      paddingTop: "4px",
      paddingBottom: "4px",
    },
  },
}));
const Layers = (props) => {
  const { path, stateWay, text } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
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
    <Grid item xs={12} className={classes.row}>
      <Grid container className={classes.selectBox}>
        <Grid item className={classes.label}>
          {text}:
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              {selectedItem.map((e) => {
                return (
                  <Box>
                    <Button
                      onClick={() => {
                        deleteSelectedItem(e);
                      }}
                      sx={{ p: 0 }}
                    >
                      X
                    </Button>
                    <Box sx={{ mr: 1, display: "inline-block" }}>{e}</Box>{" "}
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
  const classes = useStyles();
  const value = useSelector((state) => state.project.CONNECTION_STRING);
  const handleChange = (e) => {
    dispatch(changeProjectValue("CONNECTION_STRING", e.target.value));
  };
  return (
    <Grid item xs={12} className={classes.row}>
      <Grid
        container
        className={classes.selectBox}
        sx={{ width: "100%", color: "text.main" }}
      >
        <Grid item className={classes.label}>
          Connection String
        </Grid>
        <Grid item className={classes.field}>
          <TextField
            multiline
            maxRows={4}
            className={classes.textfield}
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
  const classes = useStyles();
  const value = useSelector((state) => state.project.DATABASE_CREATE_FILE);
  const handleChange = (e) => {
    dispatch(changeProjectValue("DATABASE_CREATE_FILE", e.target.value));
  };
  return (
    <Grid item xs={12} className={classes.row}>
      <Grid container className={classes.selectBox} sx={{ color: "text.main" }}>
        <Grid item className={classes.label}>
          Database creation File
        </Grid>
        <Grid item className={classes.field}>
          <TextField
            className={classes.textfield}
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
  const classes = useStyles();
  const value = useSelector((state) => state.project.IMPLEMENTATION_NAME);
  const handleChange = (e) => {
    dispatch(changeProjectValue("IMPLEMENTATION_NAME", e));
  };
  return (
    <Grid item xs={12} className={classes.row}>
      <Grid container className={classes.selectBox} sx={{ color: "text.main" }}>
        <Grid item className={classes.label}>
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
  const classes = useStyles();
  const value = useSelector((state) => state.project.UNIT_SYSTEM);
  const handleChange = (e) => {
    dispatch(changeProjectValue("UNIT_SYSTEM", e));
  };
  return (
    <Grid item xs={12} className={classes.row}>
      <Grid container className={classes.selectBox} sx={{ color: "text.main" }}>
        <Grid item className={classes.label}>
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
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const classes = useStyles();
  React.useEffect(() => {
    return () => {
      dispatch(cleanProjectReducer());
    };
  }, []);
  return (
    <Box
      sx={{
        width: `100%`,
        minHeight: isFullScreen
          ? "calc(500px - 60px  )"
          : "calc(500px - 74px  )",
        height: isFullScreen
          ? "calc(100vh - 60px )"
          : "calc(100vh - 60px - 74px )",
        button: { color: "text.secondary" },
        m: 0.5,

        border: "0.5px solid",
        borderColor: "background.main",
        borderRadius: "5px",
        overflowY: "scroll",
      }}
    >
      <Grid container sx={{ p: 1.5 }}>
        <Grid item xs={12} className={classes.row}>
          <Grid
            container
            className={classes.selectBox}
            sx={{ color: "text.main" }}
          >
            <Grid item className={classes.label}>
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
        <Typography sx={{ color: "text.main" }}>
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
            sx={{
              color: "text.main",
              backgroundColor: "background.success",
              "&:hover": {
                backgroundColor: "hover.success",
                color: "primary.dark",
              },
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectEditor;
