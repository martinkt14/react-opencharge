import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { auth, provider, db } from "../../../firebase";

import "./DialogTitle.scss";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { classes, station } = props;

  const [favoriteStation, setFavoriteStation] = useState(false);

  const checkUserLoggedIn = () => {
    if (!auth.currentUser) {
      auth.signInWithPopup(provider).then(() => {
        return true;
      });
    }

    return true;
  };

  const addFavoriteHandler = (station) => {
    //If user is logged in. Allow them to add favorite station
    if (checkUserLoggedIn()) {
      db.collection("favorites")
        .add({
          uid: auth.currentUser.uid,
          stationid: station.ID,
        })
        .then(setFavoriteStation(true))
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    }
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

  const isFavoriteStation = (station) => {
    //Check if Station is Saved as a Favorite by User
    if (auth.currentUser) {
      db.collection("favorites")
        .where("stationid", "==", station.ID)
        .where("uid", "==", auth.currentUser.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.length > 0
            ? setFavoriteStation(true)
            : setFavoriteStation(false);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    isFavoriteStation(station);
  }, [station]);

  return (
    <MuiDialogTitle disableTypography id="station-information-dialog-title">
      <div id="station-id">
        <Typography variant="h6">{station.AddressInfo.Title}</Typography>
        <a
          href={`https://openchargemap.org/site/poi/details/${station.ID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="subtitle2">OCM: {station.ID}</Typography>
        </a>
      </div>

      {favoriteStation ? (
        <Fab
          size="medium"
          className="fab fab-favorite-station"
          onClick={() => {
            removeFavoriteHandler(station);
          }}
        >
          <StarBorderIcon />
        </Fab>
      ) : (
        <Fab
          size="medium"
          className="fab fab-nonfavorite-station"
          onClick={() => {
            addFavoriteHandler(station);
          }}
        >
          <StarBorderIcon />
        </Fab>
      )}
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
