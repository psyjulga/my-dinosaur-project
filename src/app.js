import { Creature } from "./creature.js";
import { Human } from "./human.js";

// Data Handling Class
class CreatureDataHandling {
  constructor() {
    this.dinos = []; // dino instances to be stored in
    this.human = {}; // human instance to be stored in
  }
  sendDinos() {
    return this.dinos; // to access data from the outside
  }
  // get the data from the json file
  loadInternalData() {
    fetch("dino.json")
      .then((response) => response.json())
      .then((myData) =>
        // loop through json data
        // instantiate dino objects
        // and push them into the dinos array
        myData.Dinos.forEach((dino) => {
          const dinoInstance = new Creature(
            dino.species,
            dino.weight,
            dino.height,
            dino.diet,
            dino.fact,
            dino.where,
            dino.when
          );
          this.dinos.push(dinoInstance);
        })
      );
  }
  // get the data from the user form input
  loadExternalData(e) {
    e.preventDefault();
    const nameInput = document.getElementById("name").value;
    const species = "Homo Sapiens";
    const weightInput = Number(document.getElementById("weight").value);
    const feetInput = Number(document.getElementById("feet").value);
    const inchesInput = Number(document.getElementById("inches").value);
    const totalHeightInFeet = feetInput + 0.083 * inchesInput;
    const dietInput = document.getElementById("diet").value.toLowerCase();
    // instantiate human object
    // and assign it to the human object
    this.human = new Human(
      nameInput,
      species,
      weightInput,
      totalHeightInFeet,
      dietInput
    );
    // trigger the render function
    // which will show the dinographic
    renderGrid(this.human);
  }
}

// instantiate the Data Handling Class
// to invoke its methods
const dataHandling = new CreatureDataHandling();
// internal data loads onload
dataHandling.loadInternalData();

// select the form and add a submit event listener
// on submit the external data will be loaded
const inputForm = document.getElementById("dino-compare");
inputForm.addEventListener("submit", dataHandling.loadExternalData);

// which will thenn trigger the rendering function
function renderGrid(human) {
  // on submit the form disappears
  inputForm.innerHTML = " ";
  // select the grid to append children
  const grid = document.getElementById("grid");
  // get the dinos array (human object received as argument)
  const dinos = dataHandling.sendDinos();

  // loop through dinos array
  // create an array of six facts for every dino
  for (const dino of dinos) {
    const factsArr = [];
    if (dino.species !== "Homo Sapiens" && dino.species !== "Pigeon") {
      factsArr.push(dino.fact); // fact from json
      factsArr.push(`${dino.species} weighs ${dino.weight} lbs.`);
      factsArr.push(`${dino.species} lived in ${dino.era}.`);

      // three facts derive from the comparison methods
      if (human.dinoTaller(dino)) {
        factsArr.push(`You are smaller than ${dino.species}`);
      } else {
        factsArr.push(`You are taller than ${dino.species}`);
      }

      if (human.dinoHeavier(dino)) {
        factsArr.push(`You are lighter than ${dino.species}`);
      } else {
        factsArr.push(`You are heavier than ${dino.species}`);
      }

      if (human.sameDiet(dino)) {
        factsArr.push(`You have the same diet as ${dino.species}`);
      } else {
        factsArr.push(`You have a different diet than ${dino.species}`);
      }
      // select one of those facts randomly to show in the graphic
      dino.fact = factsArr[Math.floor(Math.random() * factsArr.length)];
    }
  }

  // put the human object at index 4 of the dinos array
  // so the human will be displayed in the center
  dinos.splice(4, 0, human);

  // loop throug the dinos array again
  // (which now contains the human object too)
  for (const dino of dinos) {
    // creating all html elements we need
    // append them as needed
    const gridItem = document.createElement("div");
    const headline = document.createElement("h3");
    const image = document.createElement("img");
    const paragraph = document.createElement("p");
    gridItem.classList.add("grid-item");
    grid.appendChild(gridItem);
    gridItem.appendChild(headline);
    gridItem.appendChild(image);
    gridItem.appendChild(paragraph);

    // define the elements' contents
    // depending on the species
    if (dino.species !== "Homo Sapiens") {
      const headlineContent = dino.species;
      headline.innerHTML = headlineContent;

      const dinoUrl = `images/${headlineContent.toLowerCase()}.png`;
      image.setAttribute("src", dinoUrl);

      const paragraphContent = dino.fact;
      paragraph.innerHTML = paragraphContent;
    } else {
      const headlineContent = dino.name;
      headline.innerHTML = headlineContent;

      const humanUrl = `images/human.png`;
      image.setAttribute("src", humanUrl);
    }
  }
  return;
}
