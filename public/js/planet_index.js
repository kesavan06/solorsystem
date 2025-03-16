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
    const res = await fetch("/default", {
      method: "GET",
      mode: "cors",
    });
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
    planetImg.classList.remove("planetAfter");
    internalStructure.style.backgroundColor = "transparent";
    overview.style.backgroundColor = "#419ebb";
    surface.style.backgroundColor = "transparent";
    planetName = liEle.textContent;
    planetData = await fetch(
      "/planets?planetname=" + planetName
    )
      .then((res) => res.json())
      .then((data) => data);
    givePlanetValues(planetData);
  });
}

for (let btn of optionBtns) {
  btn.addEventListener("click", async () => {
    addtionalData = await fetch(
      "/planets?planetname=" + planetName
    )
      .then((res) => res.json())
      .then((data) => data);
    console.log(addtionalData);

    if (btn.textContent.trim() == "01 OVERVIEW") {
      overviewDetails(addtionalData);
    } else if (btn.textContent.trim() == "02 INTERNAL STRUCTURE") {
      internalStrunctureDetails(addtionalData);
    } else if (btn.textContent.trim() == "03 SURFACE GEOLOGY") {
      surfaceDetails(addtionalData);
    }
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

function overviewDetails(data) {
  planetContent.textContent = data.overview.content;
  planetImg.style.backgroundImage = `url('${data.images.planet}')`;
  planetImg.classList.remove("planetAfter");
  planetLink.setAttribute("href", data.overview.source);

  internalStructure.style.backgroundColor = "transparent";
  overview.style.backgroundColor = "#419ebb";
  surface.style.backgroundColor = "transparent";
}

function internalStrunctureDetails(data) {
  planetContent.textContent = data.structure.content;
  planetImg.style.backgroundImage = `url('${data.images.internal}')`;
  planetImg.classList.remove("planetAfter");
  planetLink.setAttribute("href", data.structure.source);

  internalStructure.style.backgroundColor = "#419ebb";
  overview.style.backgroundColor = "transparent";
  surface.style.backgroundColor = "transparent";
}

function surfaceDetails(data) {
  planetContent.textContent = data.geology.content;
  planetImg.style.backgroundImage = `url('${data.images.planet}')`;
  planetImg.classList.add("planetAfter");
  planetImg.style.setProperty(
    "--bg-image",
    `url('/assets/geology-${planetName.toLowerCase()}.png')`
  );
  planetLink.setAttribute("href", data.geology.source);

  internalStructure.style.backgroundColor = "transparent";
  overview.style.backgroundColor = "transparent";
  surface.style.backgroundColor = "#419ebb";
}
