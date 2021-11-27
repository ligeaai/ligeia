import {useState} from "react";
import {Grid, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Button} from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./typeStatusAddStyle";

const useStyles = makeStyles(styles);

function TypeStatusAdd() {
  const classes = useStyles();
  const [parent, setParent] = useState("");

  const handleChangeParent = (event) => {
    setParent(event.target.value);
  };
  return (
    <Grid className={classes.container}>
      <Typography variant="h3">Add type pump</Typography>
      <div className={classes.form}>
        <Grid container direction="row" alignItems="center">
          <Grid item className={classes.code}>
            <Typography className={classes.subtitle} variant="h6">
              Code:
            </Typography>
            <TextField
              className={classes.textFields}
              InputProps={{classes: {input: classes.input}}}
              size="small"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container direction="row" alignItems="center">
          <Grid item className={classes.codeName}>
            <Typography className={classes.subtitle} variant="h6">
              Code name:
            </Typography>
            <TextField
              className={classes.textFields}
              InputProps={{classes: {input: classes.input}}}
              size="small"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container direction="row" alignItems="center">
          <Grid item className={classes.parent}>
            <Typography className={classes.subtitle} variant="h6">
              Parent
            </Typography>
            <FormControl size="small" className={classes.controlForms}>
              <Select
                id="company-ref"
                value={parent}
                label="Company Ref"
                onChange={handleChangeParent}
              ></Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid>
          <Grid item className={classes.actionsField}>
            <Button>Save and add another</Button>
            <Button>Save and continue editing</Button>
            <Button>SAVE</Button>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

export default TypeStatusAdd;
