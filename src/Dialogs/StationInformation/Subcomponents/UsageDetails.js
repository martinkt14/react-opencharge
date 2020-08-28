import React from "react";

const UsageDetails = (props) => {
  let station = props.station;

  return (
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
  );
};

export default UsageDetails;
