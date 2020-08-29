import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SearchIcon from "@material-ui/icons/Search";
import InfoIcon from "@material-ui/icons/Info";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { auth } from "./firebase";

import "./Drawer.css";
import UserLogin from "./Nav/UserLogin";

const anchorPosition = () => {
  if (window.screen.width < 500) {
    return "right";
  } else {
    return "left";
  }
};

const TemporaryDrawer = (props) => {
  return (
    <div>
      <Drawer
        anchor={anchorPosition()}
        open={props.openDrawer}
        onClose={props.toggleDrawer}
      >
        <List>
          <ListItem button key="Search" onClick={props.toggleDrawer}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search (Return to Map)" />
          </ListItem>
          {auth.currentUser ? (
            <ListItem
              button
              key="My Favorites"
              onClick={props.openFavoritesDialog}
            >
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="My Favorites" />
            </ListItem>
          ) : null}
        </List>
        <Divider />
        <List>
          {/* <ListItem button key="Using the Map">
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Using the Map" />
          </ListItem> */}
          <ListItem button key="About" onClick={props.openAboutDialog}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </List>
        <Divider />
        <UserLogin type="drawer" />
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
