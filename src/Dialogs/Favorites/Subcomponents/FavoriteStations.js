import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import "./FavoriteStation.scss";

const FavoriteStation = (station) => {
  if (station) {
    const mapsSelector = () => {
      if (
        /* if we're on iOS, open in Apple Maps */
        navigator.platform.indexOf("iPhone") !== -1 ||
        navigator.platform.indexOf("iPad") !== -1 ||
        navigator.platform.indexOf("iPod") !== -1
      )
        window.open(
          `maps://maps.google.com/maps?daddr=${station.station.coords.lat},${station.station.coords.long}&amp;ll=`
        );
      /* else use Google */ else
        window.open(
          `https://maps.google.com/maps?daddr=${station.station.coords.lat},${station.station.coords.long}&amp;ll=`
        );
    };

    return (
      <div className="favorite-station-container">
        <div className="favorite-station-info">
          <p>{station.station.title}</p>
          <p className="ocm-id">OCM: {station.station.stationid}</p>
          <div className="favorite-station-address">
            <p>{station.station.address.street}</p>
            <p>{`${station.station.address.city}, ${station.station.address.state}`}</p>
          </div>
        </div>
        <div className="favorite-station-navigate">
          <Card
            elevation={4}
            className="navigate-button"
            onClick={mapsSelector}
          >
            <CardContent>
              <i className="fas fa-route"></i>
              <p>Navigate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
};

const FavoriteStations = (props) => {
  const [favoriteStations, setFavoriteStations] = useState(null);

  useEffect(() => {
    setFavoriteStations(props.stations);
  }, [props.stations]);

  if (favoriteStations) {
    return (
      <div>
        {favoriteStations.map((station, index) => (
          <FavoriteStation station={station} key={index} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default FavoriteStations;
