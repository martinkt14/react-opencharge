import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const StationLocation = (props) => {
  let station = props.station;

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

  return (
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

      <Card elevation={4} onClick={mapsSelector} id="navigate-button">
        <CardContent>
          <i className="fas fa-route"></i>
          <p>Navigate</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StationLocation;
