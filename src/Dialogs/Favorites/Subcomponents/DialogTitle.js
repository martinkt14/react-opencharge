import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { classes } = props;

  return (
    <MuiDialogTitle disableTypography id="station-information-dialog-title">
      <Typography variant="h6">My Favorites</Typography>

      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={props.handleClose}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

export default DialogTitle;
