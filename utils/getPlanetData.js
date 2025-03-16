const data = require("../data.json");

function getPlanetData(planetName, callback) {
  let planetObj = {};
  let count = 0;
  for (let i in data) {
    if (data[i].name.toUpperCase() == planetName.toUpperCase()) {
      planetObj = data[i];
      count += 1;
      break;
    }
  }
  if (count == 0) {
    callback("An error occured", undefined);
    return;
  } else {
    callback(undefined, planetObj);
  }
}

module.exports = getPlanetData;
