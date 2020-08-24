import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SearchIcon from "@material-ui/icons/Search";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import InfoIcon from "@material-ui/icons/Info";
import ExploreIcon from "@material-ui/icons/Explore";

import "./Drawer.css";

const TemporaryDrawer = (props) => {
  return (
    <div>
      <Drawer
        anchor="left"
        open={props.openDrawer}
        onClose={props.toggleDrawer}
      >
        <List>
          <ListItem button key="Search">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button key="Find Nearest Station">
            <ListItemIcon>
              <LocationSearchingIcon />
            </ListItemIcon>
            <ListItemText primary="Find Nearest Station" />
          </ListItem>
          <ListItem button key="Using the Map">
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Using the Map" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="About" onClick={props.openAboutDialog}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
