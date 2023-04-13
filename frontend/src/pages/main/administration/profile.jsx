import * as React from "react";
import { Avatar, Button, Card, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

function FormRow() {
  document.title = "Ligeia.ai | Profile";
  const user = useSelector((state) => state.auth.user);
  const [firstName, setFirstName] = React.useState(user.first_name);
  const [surName, setSurName] = React.useState(user.last_name);
  const [email, setEmail] = React.useState(user.email);
  const [role, setRole] = React.useState(user.user_permissions);

  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);

  return (
    <Box
      style={{
        height: isFullScreen
          ? "calc(100vh - 60px )"
          : "calc(75vh - 60px - 74px )",
        padding: "3rem",
      }}
    >
      <Box
        style={{
          border: "1px solid lightGray",
          backgroundColor: "background.main",
          padding: "1vw",
          borderRadius: "2vw",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          height="100%"
          width="100%"
        >
          <Grid item>
            <TextField
              id="standard-helperText"
              label="First Name"
              defaultValue={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              id="standard-helperText"
              label="Last Name"
              defaultValue={surName}
              onChange={(event) => {
                setSurName(event.target.value);
              }}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              id="standard-helperText"
              label="Email"
              defaultValue={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              id="standard-helperText"
              label="Role"
              defaultValue={role}
              onChange={(event) => {
                setRole(event.target.value);
              }}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function SaveAndCancel() {
  return (
    <Grid container direction="row" sx={{ paddingTop: "3rem" }}>
      <Grid item sx={{ paddingRight: "1rem" }}>
        <Button
          variant="contained"
          sx={{
            color: "text.main",
            backgroundColor: "background.success",
            "&:hover": {
              backgroundColor: "hover.success",
              color: "primary.dark",
            },
            fontSize: "1vw",
          }}
        >
          Cancel
        </Button>
      </Grid>
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
            fontSize: "1vw",
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);

  return (
    <Grid container direction="column">
      <Box
        style={{
          width: "100%",
          height: isFullScreen
            ? "calc(100vh - 60px )"
            : "calc(50vh - 60px - 74px )",
          padding: "3rem",
        }}
      >
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid item>
                  <Avatar
                    alt={
                      user
                        ? user.first_name.concat(" ", user.last_name)
                        : "name"
                    }
                    src="/"
                    style={{
                      fontSize: "6vw",
                      width: "12.5vw",
                      height: "12.5vw",
                      borderRadius: "8vw",
                    }}
                  />
                </Grid>
                <Grid item sx={{ padding: "4rem 2rem" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1.5vw",
                      fontWeight: "500",
                      textTransform: "capitalize",
                      color: "#000000",
                    }}
                  >
                    {user ? user.first_name : "name"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "1vw",
                      color: "#000000",
                      textTransform: "capitalize",
                    }}
                  >
                    {user.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <SaveAndCancel />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid item>
        <FormRow></FormRow>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
