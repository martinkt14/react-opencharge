import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import { iconSrc } from "./MarkerIcon";
//Alerts
import LoadingSnackbar from "./Alerts/LoadingSnackbar";
import MaxResultsSnackbar from "./Alerts/MaxResultsSnackbar";
//Dialogs
import StationInformationDialog from "./Dialogs/StationInformationDialog";
import SearchBox from "./Dialogs/SearchBox";

import axios from "axios";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

let map = null;
var stationMarkers = [];
var userMarker = [];

const userSearchSelection = (coords) => {
  //Pan Map
  map.panTo(coords);
  //Clear Old User/Search Marker
  userMarker.forEach((marker) => {
    marker.remove();
  });
  //Set New User/Search Marker
  let marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);

  userMarker.push(marker);
};

const Map = () => {
  const mapContainer = useRef(null);

  //State
  const [loadingSnackbar, setLoadingSnackbar] = useState(false);
  const [maxResultsSnackbar, setMaxResultsSnackbar] = useState(false);
  const [stationInformationDialog, setStationInformationDialog] = useState(
    false
  );
  const [selectedStation, setSelectedStation] = useState(null);

  //Dialog Handlers
  const closeStationInformationDialogHandler = () => {
    setStationInformationDialog(false);
  };

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-87.6360688, 41.8796731],
      zoom: 12,
    });

    //Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    //Get User Location (if possible)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let marker = new mapboxgl.Marker()
          .setLngLat([position.coords.longitude, position.coords.latitude])
          .addTo(map);

        map.panTo([position.coords.longitude, position.coords.latitude]);

        userMarker.push(marker);
      });
    }

    //Get initial stations within map limits
    map.on("load", () => {
      getStationsByBounds();
    });

    const getStationsByBounds = () => {
      setLoadingSnackbar(true);
      setMaxResultsSnackbar(false);
      let bounds = map.getBounds();

      let LatLong1 = `(${bounds["_ne"].lat}, ${bounds["_ne"].lng})`;
      let LatLong2 = `(${bounds["_sw"].lat}, ${bounds["_sw"].lng})`;

      axios
        .get(
          `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=250&verbose=true&boundingbox=${LatLong1},${LatLong2}`
        )
        .then((res) => {
          clearStationMarkers();

          let stations = res.data;
          // console.log(stations);
          addStationMarkers(stations);
          setLoadingSnackbar(false);

          stations.length === 250
            ? setMaxResultsSnackbar(true)
            : setMaxResultsSnackbar(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const addStationMarkers = (stations) => {
      stations.forEach((station) => {
        let el = document.createElement("img");
        el.src = iconSrc(station);
        el.className = "station_marker";

        el.addEventListener("click", () => {
          setSelectedStation(station);
          setStationInformationDialog(true);
        });

        let marker = new mapboxgl.Marker(el)
          .setLngLat([
            station.AddressInfo.Longitude,
            station.AddressInfo.Latitude,
          ])
          .addTo(map);

        stationMarkers.push(marker);
      });
    };

    const clearStationMarkers = () => {
      stationMarkers.forEach((marker) => {
        marker.remove();
      });
    };

    //Map movement event handlers
    map.on("dragend", () => {
      getStationsByBounds();
    });
    map.on("zoomend", () => {
      getStationsByBounds();
    });
    map.on("boxzoomend", () => {
      getStationsByBounds();
    });
    map.on("moveend", () => {
      getStationsByBounds();
    });
  }, []);

  return (
    <div>
      <div id="mapbox-map" ref={mapContainer}></div>
      <SearchBox selectedLocation={userSearchSelection} />
      <LoadingSnackbar open={loadingSnackbar} />
      <MaxResultsSnackbar
        open={maxResultsSnackbar}
        setMaxResultsSnackbar={setMaxResultsSnackbar}
      />
      <StationInformationDialog
        open={stationInformationDialog}
        handleClose={closeStationInformationDialogHandler}
        station={selectedStation}
      />
    </div>
  );
};

export default Map;
