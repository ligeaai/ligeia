import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Checkbox,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { ItemSperatorLine } from "../../../../components";
import { grey } from "@mui/material/colors";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import {
  setLoaderTrue,
  setLoaderFalse,
} from "../../../../services/actions/loader";
import { loadType } from "../../../../services/api/type/type";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ComponentError } from "../../../../components";
import history from "../../../../routers/history";
import MyTextField from "./myTextField";
import {
  setValue,
  changeValue,
} from "../../../../services/reducers/typeReducer";
import { setTextValue } from "../../../../services/reducers/typeTextReducer";
const SeperatorLineVertical = () => {
  return (
    <Box
      sx={{
        height: "26px",
        width: "2px",
        backgroundColor: "#4B4B4B",
        marginX: "2px",
      }}
    />
  );
};

const DataGridDemo = ({ type }) => {
  const dispatch = useDispatch();
  const culture = useSelector((state) => state.lang.cultur);
  const [rows, setRows] = React.useState(false);
  const typeRedux = useSelector((state) => state.type);
  const columns = [
    {
      field: "PROPERTY_NAME",
      headerName: "Property",
      width: 200,
      renderCell: (params) => {
        return params.row["RESOURCE-LIST"][0].SHORT_LABEL;
      },
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "PROP_GRP",
      headerName: "Category",
      width: 100,
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "SORT_ORDER",
      headerName: "Sort Order",
      width: 100,
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "MANDATORY",
      headerName: "Mandatory",
      type: "boolean",
      renderCell: (params) => {
        return <Checkbox disabled checked={params.row.MANDATORY === "True"} />;
      },
      width: 100,
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "editable",
      headerName: "",
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        if (params.row.PROPERTY_TYPE === "TEXT") {
          return <MyTextField myKey={`${params.row.LABEL_ID}`} />;
        }
        if (params.row.PROPERTY_TYPE === "INT") {
          return (
            <MyTextField myKey={`${params.row.LABEL_ID}`} textType="number" />
          );
        }
        if (params.row.PROPERTY_TYPE === "BOOL") {
          return (
            <Checkbox
              sx={{ margin: "auto" }}
              checked={
                typeRedux[`${params.row.LABEL_ID}`] === ""
                  ? false
                  : typeRedux[`${params.row.LABEL_ID}`]
              }
              onChange={(event) => {
                dispatch(
                  changeValue({
                    key: params.row.LABEL_ID,
                    value: event.currentTarget.checked,
                  })
                );
              }}
            />
          );
        }
        if (params.row.PROPERTY_TYPE === "HISTORY") {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={typeRedux[`${params.row.LABEL_ID}`]}
                onChange={(newValue) => {
                  dispatch(
                    changeValue({ key: params.row.LABEL_ID, value: newValue })
                  );
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </LocalizationProvider>
          );
        }
        try {
          if (params.row.PROPERTY_TYPE === "CODE") {
            return (
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    labelId="code-list"
                    defaultValue={typeRedux[`${params.row.LABEL_ID}`]}
                    value={typeRedux[`${params.row.LABEL_ID}`]}
                    onChange={(event) => {
                      dispatch(
                        changeValue({
                          key: params.row.LABEL_ID,
                          value: event.target.value,
                        })
                      );
                    }}
                    sx={{
                      ".MuiOutlinedInput-notchedOutline": { border: "none" },
                      "::focus": {
                        ".MuiOutlinedInput-notchedOutline": { border: "none" },
                      },
                    }}
                  >
                    {params.row["CODE-LIST"][0].CHILD.map((e, key) => {
                      return (
                        <MenuItem key={key} value={e.CODE_TEXT}>
                          {e.CODE_TEXT}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            );
          }
        } catch {
          return <Box>Empty List</Box>;
        }
      },
    },
  ];

  React.useEffect(() => {
    setRows(false);
    dispatch(setLoaderTrue);
    const getData = async () => {
      let data = await loadType(type, culture);
      try {
        const temp = {};
        const tempText = {};
        data.data.TYPE["TYPE PROPERTY COLUMNS"].BASETYPE.concat([
          {
            PROPERTY_NAME: "",
            CODE_LIST: null,
            MANDATORY: "False",
            LABEL_ID: "HISTORY",
            PROP_GRP: "",
            PROPERTY_TYPE: "HISTORY",
            SORT_ORDER: "",
            "RESOURCE-LIST": [
              {
                SHORT_LABEL: "",
              },
            ],
          },
        ])
          .concat(data.data.TYPE["TYPE PROPERTY COLUMNS"].TYPE)
          .map((e) => {
            if (e.PROPERTY_TYPE === "TEXT" || e.PROPERTY_TYPE === "INT") {
              tempText[e.LABEL_ID] = "";
            } else {
              temp[e.LABEL_ID] =
                e.CODE_LIST && e["CODE-LIST"].length !== 0
                  ? e["CODE-LIST"][0].CODE_TEXT
                  : "";
            }
          });
        dispatch(setTextValue(tempText));
        dispatch(setValue(temp));
      } catch {
        console.log(
          "BOOM!something has gone terribly wrong(but we already sent droids to fix it)"
        );
      }

      setRows(data);
      dispatch(setLoaderFalse());
    };
    getData();
  }, [type]);

  if (rows) {
    return (
      <Box
        sx={{
          width: "674px",
          minHeight: "calc(500px - 50px - 36px - 32px - 42px)",
          height: "calc(100vh - 60px - 4px - 50px - 36px - 32px - 42px)",
          "& .super-app-theme--cell": {
            backgroundColor: grey[200],
          },
          button: { color: "#4B4B4B" },
        }}
      >
        <DataGrid
          rows={rows.data.TYPE["TYPE PROPERTY COLUMNS"].BASETYPE.concat(
            rows.data.TYPE["TYPE PROPERTY COLUMNS"].TYPE
          ).concat([
            {
              PROPERTY_NAME: "",
              CODE_LIST: null,
              MANDATORY: "False",
              LABEL_ID: "HISTORY",
              PROP_GRP: "",
              PROPERTY_TYPE: "HISTORY",
              SORT_ORDER: "",
              "RESOURCE-LIST": [
                {
                  SHORT_LABEL: "",
                },
              ],
            },
          ])}
          columns={columns}
          hideFooter={true}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.LABEL_ID}
          sx={{}}
        />
      </Box>
    );
  }
};

const FilterBox = () => {
  return (
    <Grid container sx={{ alignItems: "center", mt: 1 }}>
      <SearchIcon />
      <AddIcon />
      <SeperatorLineVertical />
      <MenuIcon />
      <MenuIcon />
      <MenuIcon fontSize="small" />
      <SeperatorLineVertical />
      <TuneOutlinedIcon />
      <FileDownloadOutlinedIcon />
    </Grid>
  );
};

const properties = ({ type }) => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        m: 0.5,
        mb: 1,
        mr: 1,
        width: "100%",
        height: "100%",
        borderRadius: "3px",
      }}
    >
      <Grid container sx={{ justifyContent: "flex-end" }}>
        <Grid item>
          <FilterBox />
        </Grid>
      </Grid>
      <ItemSperatorLine />
      <Grid container sx={{ pl: 0.5 }}>
        <Grid item xs={12} md={7}>
          <ComponentError errMsg="Table could not be loaded">
            <DataGridDemo type={type} />
          </ComponentError>
        </Grid>
      </Grid>
    </Box>
  );
};

export default properties;
