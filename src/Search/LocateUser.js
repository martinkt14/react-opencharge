import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const LocateUser = (props) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<LocationSearchingIcon />}
      onClick={props.clickHandler}
    >
      Use My Location
    </Button>
  );
};

export default LocateUser;
