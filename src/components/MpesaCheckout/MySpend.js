import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'Payments have never been this easy,',
    imgPath:
      ' https://i1.wp.com/tech-ish.com/wp-content/uploads/2020/11/MPESA-Mshwari-Safaricom.png',
  },
  {
    label: 'Download the Mpesa app on your phone',
    imgPath:
      'https://www.safaricom.co.ke/blog/wp-content/uploads/2016/05/Blog_bannerapp.jpg',
  },
  {
    label: 'Checkout all the best deals inclusive',
    imgPath:
      ' https://secureservercdn.net/104.238.71.250/fcf.f5f.myftpupload.com/wp-content/uploads/AAEAAQAAAAAAAAISAAAAJDdhZjNjNzgwLWQ4N2EtNDFiOS1hNTQ3LWUxZWE3NjZkNzlmMA-2.png',
  },
  {
    label: 'Transforming lives across the country',
    imgPath:
      'https://cms.qz.com/wp-content/uploads/2013/11/reuters-mpesa.jpg?quality=75&strip=all&w=1600&h=900&crop=1',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: '1rem'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    textAlign:"center",
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 250,
    overflow: 'hidden',
    width: '100%',
    borderRadius: '1rem'
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;

