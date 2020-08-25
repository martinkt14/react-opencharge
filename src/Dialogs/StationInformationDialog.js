import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import DialogContentText from "@material-ui/core/DialogContentText";

import ConnectionCard from "./ConnectionCard";

import "./StationInformationDialog.scss";

const headerBackgroundColor = () => {
  return "red";
};

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  stationDialogHeader: {
    backgroundColor: headerBackgroundColor,
    color: "white",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={(classes.root, classes.stationDialogHeader)}
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const ConnectionCards = (connections) => {
  let connectionCards = connections["connections"].map((connection, index) => {
    return (
      <ConnectionCard connection={connection} key={index}></ConnectionCard>
    );
  });

  return connectionCards;
};

const StationInformationDialog = (props) => {
  let station = props.station;
  let title = null;
  let content = null;

  //Define Title Information
  if (station) {
    title = station.AddressInfo.Title;
  }

  //Define Content Information
  if (station) {
    const mapsSelector = () => {
      if (
        /* if we're on iOS, open in Apple Maps */
        navigator.platform.indexOf("iPhone") !== -1 ||
        navigator.platform.indexOf("iPad") !== -1 ||
        navigator.platform.indexOf("iPod") !== -1
      )
        window.open(
          `maps://maps.google.com/maps?daddr=${station.AddressInfo.Latitude},${station.AddressInfo.Longitude}&amp;ll=`
        );
      /* else use Google */ else
        window.open(
          `https://maps.google.com/maps?daddr=${station.AddressInfo.Latitude},${station.AddressInfo.Longitude}&amp;ll=`
        );
    };

    content = (
      <div id="station-information-content">
        <div className="station-information-content-section">
          <h4>
            <i className="fas fa-map-marked-alt"></i>Location Details/Nearest
            Address
          </h4>
          <p>{station.AddressInfo.AddressLine1}</p>
          <p>
            {station.AddressInfo.Town}, {station.AddressInfo.StateOrProvince}{" "}
            {station.AddressInfo.Postcode}
          </p>
        </div>
        <Card elevation={4} onClick={mapsSelector}>
          <CardContent id="navigate-button">
            <i className="fas fa-route"></i>
            <p>Navigate</p>
          </CardContent>
        </Card>

        <div className="station-information-content-section">
          <h4>
            <i className="fas fa-charging-station"></i>Equipment Information
          </h4>

          <p>
            <strong>Number of Stations/Bays:</strong>{" "}
            {station.Connections.length}
          </p>
          <p>
            <strong>Operational Status:</strong>{" "}
            {station.StatusType ? station.StatusType.Title : "Unknown"}
          </p>
          <div id="connection-display-grid">
            <ConnectionCards
              connections={station.Connections}
            ></ConnectionCards>
          </div>
        </div>
        <div className="station-information-content-section">
          <h4>
            <i className="fas fa-file-alt"></i>Usage Details/Restrictions
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} maxWidth="lg">
        <DialogTitle onClose={props.handleClose}>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </div>
  );
};

export default StationInformationDialog;
