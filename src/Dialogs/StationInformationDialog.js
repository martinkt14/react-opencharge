import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";

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
    content = (
      <div>
        <h4>Location Details</h4>
        <p>{station.AddressInfo.AddressLine1}</p>
        <p>
          {station.AddressInfo.Town}, {station.AddressInfo.StateOrProvince}{" "}
          {station.AddressInfo.Postcode}
        </p>
      </div>
    );
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </div>
  );
};

export default StationInformationDialog;
