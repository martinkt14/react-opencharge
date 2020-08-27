import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
// import Button from "@material-ui/core/Button";

import Drawer from "./Drawer";
import AboutDialog from "./Dialogs/AboutDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = () => {
  const classes = useStyles();

  let [drawerOpen, setDrawerOpen] = useState(false);
  let [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  const openAboutDialogHandler = () => {
    setAboutDialogOpen(true);
    setDrawerOpen(false);
  };

  const closeAboutDialogHandler = () => {
    setAboutDialogOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(drawerOpen ? false : true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" className={classes.title}>
            Electric Vehicle Charging Stations
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer
        openDrawer={drawerOpen}
        toggleDrawer={toggleDrawer}
        openAboutDialog={openAboutDialogHandler}
      />
      <AboutDialog
        open={aboutDialogOpen}
        handleClose={closeAboutDialogHandler}
      />
    </div>
  );
};

export default Nav;
