import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "./Subcomponents/DialogTitle";
import StationLocation from "./Subcomponents/StationLocation";
import EquipmentInformation from "./Subcomponents/EquipmentInformation";
import UsageDetails from "./Subcomponents/UsageDetails";

import "./StationInformationDialog.scss";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const fullScreenDialog = () => {
  return window.screen.width <= 500 ? true : false;
};

const StationInformationDialog = withStyles(styles)((props) => {
  let station = props.station;

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullScreen={fullScreenDialog()}
        id="station-information-dialog"
      >
        <DialogTitle station={station} handleClose={props.handleClose} />
        <DialogContent>
          <StationLocation station={station} />
          <EquipmentInformation station={station} />
          <UsageDetails station={station} />
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default StationInformationDialog;
