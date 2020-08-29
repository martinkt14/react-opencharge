import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import Drawer from "../Drawer";
import FavoritesDialog from "./../Dialogs/Favorites/FavoritesDialog";
import AboutDialog from "../Dialogs/About/AboutDialog";
import UserLogin from "./UserLogin";

import "./Nav.scss";

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
  let [favoritesDialogOpen, setFavoritesDialogOpen] = useState(false);

  const openAboutDialogHandler = () => {
    setAboutDialogOpen(true);
    setDrawerOpen(false);
  };

  const closeAboutDialogHandler = () => {
    setAboutDialogOpen(false);
  };

  const openFavoritesDialogHandler = () => {
    setFavoritesDialogOpen(true);
    setDrawerOpen(false);
  };

  const closeFavoritesDialogHandler = () => {
    setFavoritesDialogOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(drawerOpen ? false : true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" id="nav-bar">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <p id="nav-title">Electric Vehicle Charging Stations</p>
          {window.screen.width < 500 ? "" : <UserLogin type="nav" />}
        </Toolbar>
      </AppBar>
      <Drawer
        openDrawer={drawerOpen}
        toggleDrawer={toggleDrawer}
        openAboutDialog={openAboutDialogHandler}
        openFavoritesDialog={openFavoritesDialogHandler}
      />
      <AboutDialog
        open={aboutDialogOpen}
        handleClose={closeAboutDialogHandler}
      />
      <FavoritesDialog
        open={favoritesDialogOpen}
        handleClose={closeFavoritesDialogHandler}
      />
    </div>
  );
};

export default Nav;
