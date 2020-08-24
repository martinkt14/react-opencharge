import React from "react";
import { Snackbar } from "@material-ui/core";

const LoadingSnackbar = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      message="Locating charging stations..."
      open={props.open}
    ></Snackbar>
  );
};

export default LoadingSnackbar;
