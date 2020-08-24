import React from "react";
import { Snackbar } from "@material-ui/core";

const MaxResultsSnackbar = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      message="A maximum of 250 charging stations are shown. Zoom in for more complete results."
      open={props.open}
    ></Snackbar>
  );
};

export default MaxResultsSnackbar;
