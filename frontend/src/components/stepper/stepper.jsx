import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { checkMandatory } from "../../services/actions/stepper/stepper";
import { useDispatch } from "react-redux";
import { ADD_ERROR_SUCCESS } from "../../services/actions/types";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import { StepButton } from "@mui/material";
const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));
export default function HorizontalLinearStepper({
  components,
  finishFunc,
  height,
}) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (!dispatch(checkMandatory(activeStep))) {
      dispatch({
        type: ADD_ERROR_SUCCESS,
        payload: "You need to fill mandatory fields.",
      });
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  console.log(components);
  return (
    <Box sx={{ width: "100%", height: "100%", pt: 2 }}>
      <Stepper activeStep={activeStep} connector={<QontoConnector />}>
        {components().map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label[0]} {...stepProps}>
              <StepButton onClick={handleStep(index)}>
                <StepLabel {...labelProps} StepIconComponent={QontoStepIcon}>
                  {label[0]}
                </StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <Divider sx={{ mt: 2, mb: 2 }}></Divider>
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            height: height - 166,
            width: "100%",
            overflowY: "auto",
            px: 1,
            pb: 1.5,
          }}
        >
          {components()[activeStep][1]}
        </Typography>
        <Box
          sx={{
            display: "fixed",
            width: "100%",
            backgroundColor: "background.main",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: 1,
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="outlined"
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {false && (
              <Button
                color="inherit"
                onClick={handleSkip}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                Skip
              </Button>
            )}

            {activeStep === components().length - 1 ? (
              <Button onClick={finishFunc} variant="outlined">
                Finish
              </Button>
            ) : (
              <Button onClick={handleNext} variant="outlined">
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
