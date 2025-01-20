let planetElements = document.querySelectorAll("#allPlanets li");
let optionBtns = document.querySelectorAll(".btnOptions button");
let planetContent = document.getElementById("planetContent");
let planetHead = document.getElementById("planetHead");
let planetImg = document.getElementById("planetImg");
let planetLink = document.getElementById("planetLink");
let rotationTime = document.getElementById("rotationTime");
let revolutionTime = document.getElementById("revolutionTime");
let radius = document.getElementById("radius");
let avgTemp = document.getElementById("avgTemp");
let overview = document.getElementById("overview");
let internalStructure = document.getElementById("internalStructure");
let surface = document.getElementById("surface");
overview.style.backgroundColor = "#419ebb";
let planetData;
let addtionalData;
let planetName;

async function defaultPlanetData() {
  try {
    const res = await fetch("http://localhost:3006/default");
    planetData = await res.json();
    givePlanetValues(planetData);
    planetName = planetData.name;
    console.log("Data fetched:", planetData); // Logs the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
defaultPlanetData();

for (let liEle of planetElements) {
  liEle.addEventListener("click", async () => {
    planetName = liEle.textContent;
    planetData = await fetch(
      "http://localhost:3006/planets?planetname=" + planetName
    )
      .then((res) => res.json())
      .then((data) => data);
    givePlanetValues(planetData);
  });
}

for (let btn of optionBtns) {
  btn.addEventListener("click", async () => {
    addtionalData = await fetch(
      "http://localhost:3006/additional?planetname=" + planetName
    )
      .then((res) => res.json())
      .then((data) => data);
    console.log(addtionalData);
  });
}

function givePlanetValues(data) {
  planetContent.textContent = data.overview.content;
  planetHead.textContent = data.name.toUpperCase();
  planetImg.style.backgroundImage = `url('${data.images.planet}')`;
  planetLink.setAttribute("href", data.overview.source);
  rotationTime.textContent = data.rotation.toUpperCase();
  revolutionTime.textContent = data.revolution.toUpperCase();
  radius.textContent = data.radius.toUpperCase();
  avgTemp.textContent = data.temperature.toUpperCase();
}
