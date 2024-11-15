const inputContainer = document.getElementById("input-container");
const loadingDiv = document.getElementById("loading-div");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const result = document.getElementById("result");

const dataUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

async function getApiData(url) {
  try {
    const dataStream = await fetch(url);
    const parsedData = await dataStream.json();
    return parsedData;
  }
  catch (err) {
    console.log(err);
  }
}

function isInputValid(input) {
  const regex = /^\d+$|^[a-z]{2,15}$|^[a-z]{2,6}\.?\s[a-z]{2,6}\.?$|^[a-z]{2,15}\-[fm]$/;

  return regex.test(input);
}

function toggleInput() {
  if (inputContainer.style.visibility === "hidden") {
    inputContainer.style.visibility = "visible";
    loadingDiv.style.display = "none";
  } else {
    inputContainer.style.visibility = "hidden";
    loadingDiv.style.display = "block";
  }
}

function getTypes(typesArr) {
  return `<span class="type ${typesArr[0]["type"]["name"]}">${typesArr[0]["type"]["name"]}</span>
  ${typesArr.length === 2 ? `<span class="type ${typesArr[1]["type"]["name"]}">${typesArr[1]["type"]["name"]}</span>` : ""}`;
}

function displayData(data) {
  result.innerHTML = `
          <div id="preview" class="info">
            <div id="name-and-id-div">
              <span id="pokemon-name">${data["name"].charAt(0).toUpperCase() + data["name"].slice(1)}</span><span id="pokemon-id"> #${data["id"]}</span>
            </div>
            <div id="weight-and-height-div">
              <span id="weight">Weight: ${data["weight"]}</span>
              <span id="height">Height: ${data["height"]}</span>
            </div>
            <div id="image-div">
              <img id="sprite" src=${data["sprites"]["front_default"]} alt="${data["name"]}">
            </div>
            <div id="types">
              ${getTypes(data["types"])}
            </div>
          </div>
          <div id="stats" class="info">
            <table>
              <thead>
                <th>Stat</th>
                <th>Value</th>
              </thead>
              <tbody>
                <tr>
                  <td>HP</td>
                  <td id="hp">${data["stats"][0]["base_stat"]}</td>
                </tr>
                <tr>
                  <td>Attack</td>
                  <td id="attack">${data["stats"][1]["base_stat"]}</td>
                </tr>
                <tr>
                  <td>Defense</td>
                  <td id="defense">${data["stats"][2]["base_stat"]}</td>
                </tr>
                <tr>
                  <td>Special Attack</td>
                  <td id="special-attack">${data["stats"][3]["base_stat"]}</td>
                </tr>
                <tr>
                  <td>Special Defense</td>
                  <td id="special-defense">${data["stats"][4]["base_stat"]}</td>
                </tr>
                <tr>
                  <td>Speed</td>
                  <td id="speed">${data["stats"][5]["base_stat"]}</td>
                </tr>
              </tbody>
            </table>
          </div>
  `;
}

searchBtn.addEventListener("click", (event) => {
	event.preventDefault();
  const userInput = searchInput.value.trim().toLowerCase();

  if (!isInputValid(userInput)) {
    alert("Invalid Input");
	searchInput.value = "";
    return;
  }
  let data;

  toggleInput();
  getApiData(dataUrl + userInput).then(response => {
    data = response;
    displayData(data);
    toggleInput();
  }).catch(err => {
    alert("Pokémon not found");
    toggleInput();
  });
  searchInput.value = "";
});