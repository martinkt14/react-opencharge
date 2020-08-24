const levelDetermination = (connections) => {
  let level = null;

  connections.forEach((connection) => {
    if (connection.LevelID > level) {
      level = connection.LevelID;
    }
  });

  return level;
};

const statusDetermination = (connections) => {
  let status = null;

  connections.forEach((connection) => {
    if (connection.StatusType === null) {
      status = "nonoperational";
    } else {
      status = connection.StatusType.IsOperational
        ? "operational"
        : "nonoperational";
    }
  });

  return status;
};

const iconSrc = (station) => {
  let iconString = "";

  if (levelDetermination(station.Connections) === null) {
    return require(`./images/unknown_${statusDetermination(
      station.Connections
    )}_icon.png`);
  }

  iconString = require(`./images/level${levelDetermination(
    station.Connections
  )}_${statusDetermination(station.Connections)}_icon.png`);

  return iconString;
};

export { iconSrc };
