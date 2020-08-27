import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import ConnectionCard from "./ConnectionCard";

import "./StationInformationDialog.scss";

import { auth, db } from "./../firebase";

const headerBackgroundColor = () => {
  return "#3f51b5";
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

const fullScreenDialog = () => {
  return window.screen.width <= 500 ? true : false;
};

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
  var station = props.station;
  let title = null;
  let content = null;

  const [favoriteStation, setFavoriteStation] = useState(false);

  useEffect(() => {
    //On Render Check If Favorite Station
    db.collection("favorites")
      .where("stationid", "==", station.ID)
      .where("uid", "==", auth.currentUser.uid)
      .get()
      .then((docs) => {
        if (!docs) {
          setFavoriteStation(false);
        } else {
          docs.forEach((doc) => {
            if (doc.stationid === station.ID) {
              setFavoriteStation(true);
            }
          });
        }
      })
      .catch((error) =>
        console.error("Unable to determine favorite status of station selected")
      );
  });

  const addFavoriteHandler = (station) => {
    db.collection("favorites")
      .add({
        uid: auth.currentUser.uid,
        stationid: station.ID,
      })
      .then(setFavoriteStation(true))
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const removeFavoriteHandler = (station) => {
    //Get Matching Document
    let favorites = db.collection("favorites");
    let query = favorites
      .where("stationid", "==", station.ID)
      .where("uid", "==", auth.currentUser.uid);

    query
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //Delete Document
          db.collection("favorites")
            .doc(doc.id)
            .delete()
            .then(setFavoriteStation(false))
            .catch((error) =>
              console.error("Error removing favorite: ", error)
            );
        });
      })
      .catch((error) => console.log("Error getting favorite: ", error));
  };

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

    const stationQuantity = () => {
      let connections = station.Connections;
      let quantity = 0;

      connections.forEach((connection) => {
        quantity += connection.Quantity ? connection.Quantity : 1;
      });

      return quantity;
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
            <strong>Number of Stations/Bays:</strong> {stationQuantity()}
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
          <p>
            <strong>Usage:</strong>{" "}
            {station.UsageType ? station.UsageType.Title : "Unknown"}
          </p>
          <p>
            <strong>Usage Cost:</strong>{" "}
            {station.UsageCost ? station.UsageCost : "Unknown"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullScreen={fullScreenDialog()}
      >
        <DialogTitle onClose={props.handleClose}>
          {title}
          {favoriteStation ? (
            <Fab
              size="medium"
              className="fab fab-favorite-station"
              onClick={() => {
                removeFavoriteHandler(station);
              }}
            >
              <FavoriteBorderIcon />
            </Fab>
          ) : (
            <Fab
              size="medium"
              className="fab fab-nonfavorite-station"
              onClick={() => {
                addFavoriteHandler(station);
              }}
            >
              <FavoriteBorderIcon />
            </Fab>
          )}
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </div>
  );
};

export default StationInformationDialog;
