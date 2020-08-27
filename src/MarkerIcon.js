const levelDetermination = (connections) => {
  let level = null;

  connections.forEach((connection) => {
    if (connection.LevelID > level) {
      level = connection.LevelID;
    }
  });

  return level;
};

const statusDetermination = (station) => {
  let status = null;

  if (station.StatusType === null) {
    status = "operational";
  } else {
    status = station.StatusType.IsOperational
      ? "operational"
      : "nonoperational";
  }

  return status;
};

const MarkerIcon = (station) => {
  let iconString = "";

  if (levelDetermination(station.Connections) === null) {
    return require(`./images/unknown_${statusDetermination(station)}_icon.png`);
  }

  iconString = require(`./images/level${levelDetermination(
    station.Connections
  )}_${statusDetermination(station)}_icon.png`);

  return iconString;
};

export { MarkerIcon };
