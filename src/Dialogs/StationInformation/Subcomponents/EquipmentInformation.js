import React from "react";
import ConnectionCard from "./ConnectionCard";

const EquipmentInformation = (props) => {
  let station = props.station;

  const ConnectionCards = (connections) => {
    let connectionCards = connections["connections"].map(
      (connection, index) => {
        return (
          <ConnectionCard connection={connection} key={index}></ConnectionCard>
        );
      }
    );

    return connectionCards;
  };

  const stationQuantity = () => {
    let connections = station.Connections;
    let quantity = 0;

    connections.forEach((connection) => {
      quantity += connection.Quantity ? connection.Quantity : 1;
    });

    return quantity;
  };

  return (
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
        <ConnectionCards connections={station.Connections}></ConnectionCards>
      </div>
    </div>
  );
};

export default EquipmentInformation;
