import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const fullScreenDialog = () => {
  return window.screen.width <= 500 ? true : false;
};

const AboutDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullScreen={fullScreenDialog()}
      >
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              Data obtained from Open Charge Map, the global public registry of
              Electric Vehicle charging locations. Data supplied by
              OpenChargeMap.org is derived from a wide variety of public sources
              and contributions. We accept no liability for the accuracy of this
              data and provide no assurances.
            </p>
            <p>
              Web:{" "}
              <a
                href="https://www.openchargemap.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.openchargemap.org
              </a>
            </p>
            <p>
              API:{" "}
              <a
                href="https://openchargemap.org/site/develop/api"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://openchargemap.org/site/develop/api
              </a>
            </p>
            <p>
              The site you are using was created by{" "}
              <a
                href="https://www.martinteufel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Martin K. Teufel
              </a>
              , a web developer based out of Westfield, Indiana.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AboutDialog;
