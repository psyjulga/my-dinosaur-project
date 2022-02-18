import { creatures } from "../creature-data.js";

class Creature {
  constructor(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.location = where;
    this.era = when;
    this.fact = fact;
  }
}

class Human extends Creature {
  constructor(
    name,
    species,
    weight,
    height,
    diet,
    location = "World Wide",
    era = "Holocene",
    fact = "All humans are animals."
  ) {
    super(species, weight, height, diet, location, era, fact);
    this.name = name;
  }
  // get: calculateHeight from feet and inches
}

class CreatureDataHandling {
  constructor() {
    this.dinos = [];
    this.human = {};
  }
  sendDinos() {
    return this.dinos;
  }
  loadInternalData(creatures) {
    for (let creature of creatures) {
      const dino = new Creature(
        creature.species,
        creature.weight,
        creature.height,
        creature.diet,
        creature.where,
        creature.when,
        creature.fact
      );
      this.dinos.push(dino);
    }
  }

  loadExternalData(e) {
    e.preventDefault();
    const nameInput = document.getElementById("name").value;
    const species = "homo sapiens";
    const weightInput = document.getElementById("weight").value;
    const feetInput = document.getElementById("feet").value;
    //const inchesInput = document.getElementById("inches").value;
    const dietInput = document.getElementById("diet").value;

    this.human = new Human(
      nameInput,
      species,
      weightInput,
      feetInput,
      //inchesInput, // getter
      dietInput
    );

    renderGrid(this.human);
  }
}

const dataHandling = new CreatureDataHandling();
dataHandling.loadInternalData(creatures);

const inputForm = document.getElementById("dino-compare");
inputForm.addEventListener("submit", dataHandling.loadExternalData);

function renderGrid(human) {
  const grid = document.getElementById("grid");
  const dinos = dataHandling.sendDinos();
  dinos.splice(4, 0, human);

  for (const dino of dinos) {
    const gridItem = document.createElement("div");
    const headline = document.createElement("h3");
    const image = document.createElement("img");
    const paragraph = document.createElement("p");
    gridItem.classList.add("grid-item");
    grid.appendChild(gridItem);
    gridItem.appendChild(headline);
    gridItem.appendChild(image);
    gridItem.appendChild(paragraph);

    if (dino.species !== "homo sapiens") {
      const headlineContent = dino.species;
      headline.innerHTML = headlineContent;

      const dinoUrl = `../images/${headlineContent.toLowerCase()}.png`;
      image.setAttribute("src", dinoUrl);

      const paragraphContent = dino.fact;
      paragraph.innerHTML = paragraphContent;
    } else {
      const headlineContent = dino.name;
      headline.innerHTML = headlineContent;

      const humanUrl = `../images/human.png`;
      image.setAttribute("src", humanUrl);
    }
  }
}
