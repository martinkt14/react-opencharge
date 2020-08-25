import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    margin: "1rem auto 0",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    padding: 10,
  },
  searchList: {
    cursor: "pointer",
  },
  attributionText: {
    fontSize: "9px",
    color: "lightgray",
  },
}));

export default function SearchBox(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);

    if (searchValue.length > 4) {
      //Mapbox forward geoencoding API baseURL
      const mapboxFGBaseURL =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/";

      //Search for data
      axios
        .get(
          `${mapboxFGBaseURL}${encodeURI(searchValue)}.json?access_token=${
            process.env.REACT_APP_MAPBOX_API_KEY
          }`
        )
        .then((res) => {
          setSearchResults(res.data);
          setShowResults(true);
        })
        .catch((err) => console.error(err));
    } else {
      setShowResults(false);
    }
  };

  const handleResultSelection = (selection) => {
    //Send Selection to Maps
    props.selectedLocation(selection.center);

    //Clear search results
    setShowResults(false);
    setSearchValue("");
  };

  const SearchResultsList = () => {
    if (showResults) {
      return (
        <Card className={classes.root}>
          <CardContent>
            <List className={classes.searchList}>
              {searchResults.features.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    onClick={() => handleResultSelection(item)}
                  >
                    {item.place_name}
                  </ListItem>
                );
              })}
            </List>
            <Divider />;
            <p className={classes.attributionText}>
              {searchResults.attribution}
            </p>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  return (
    <div>
      <Paper className={classes.root} elevation={3}>
        <SearchIcon className={classes.searchIcon} />
        <InputBase
          className={classes.input}
          placeholder="Search Charging Stations"
          inputProps={{ "aria-label": "search for charging stations" }}
          value={searchValue}
          onChange={handleInputChange}
        />
      </Paper>
      <SearchResultsList />
    </div>
  );
}
