import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "./Subcomponents/DialogTitle";

import FavoriteStations from "./Subcomponents/FavoriteStations";

import { auth, db } from "./../../firebase";

import "./FavoritesDialog.scss";

const fullScreenDialog = () => {
  return window.screen.width <= 500 ? true : false;
};

const FavoritesDialog = (props) => {
  const [favoriteStations, setFavoriteStations] = useState([]);

  const getFavoriteStations = () => {
    db.collection("favorites")
      .where("uid", "==", auth.currentUser.uid)
      .get()
      .then((querySnapshot) => {
        let favoriteStations = [];
        querySnapshot.forEach((doc) => {
          favoriteStations.push(doc.data());
        });
        setFavoriteStations(favoriteStations);
      })
      .catch();
  };

  useEffect(() => {
    if (auth.currentUser) {
      getFavoriteStations();
    }
  }, [props.open]);

  console.log(favoriteStations);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullScreen={fullScreenDialog()}
      id="favorites-dialog"
    >
      <DialogTitle handleClose={props.handleClose} />
      <DialogContent>
        {favoriteStations.length > 0 ? (
          <FavoriteStations stations={favoriteStations} />
        ) : (
          ""
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FavoritesDialog;
