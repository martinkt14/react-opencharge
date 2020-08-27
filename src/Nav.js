import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import Drawer from "./Drawer";
import AboutDialog from "./Dialogs/AboutDialog";

import { auth, provider } from "./firebase";

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
  logoutContainer: {
    display: "flex",
  },
}));

const Nav = () => {
  const classes = useStyles();

  let [drawerOpen, setDrawerOpen] = useState(false);
  let [aboutDialogOpen, setAboutDialogOpen] = useState(false);
  let [user, setUser] = useState(null);

  const loginHandler = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      setUser(user);
    });
  };

  const logoutHandler = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });
  });

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
          {user ? (
            <div className={classes.logoutContainer}>
              <Avatar src={user.photoURL} />
              <Button color="inherit" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          ) : (
            <Button color="inherit" onClick={loginHandler}>
              Login
            </Button>
          )}
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
