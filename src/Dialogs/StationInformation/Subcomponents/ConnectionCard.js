import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import "./ConnectionCard.scss";

const ConnectionCard = (props) => {
  return (
    <Card elevation={3}>
      <CardContent className="connection-card">
        <div className="connection-icon-container">
          <i className="far fa-charging-station"></i>
          <p className="connection-quantity">
            x{props.connection.Quantity ? props.connection.Quantity : "1"}
          </p>
        </div>
        <div>
          <p>{props.connection.ConnectionType.Title}</p>
          <p>
            {props.connection.PowerKW ? props.connection.PowerKW + "kW" : ""}
          </p>
          <p>
            {props.connection.CurrentType
              ? props.connection.CurrentType.Title
              : ""}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
