const creatures = [
  {
    species: "Triceratops",
    weight: 13000,
    height: 114,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "First discovered in 1889 by Othniel Charles Marsh",
  },
  {
    species: "Tyrannosaurus Rex",
    weight: 11905,
    height: 144,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "The largest known skull measures in at 5 feet long.",
  },
  {
    species: "Anklyosaurus",
    weight: 10500,
    height: 55,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Anklyosaurus survived for approximately 135 million years.",
  },
  {
    species: "Brachiosaurus",
    weight: 70000,
    height: "372",
    diet: "herbavor",
    where: "North America",
    when: "Late Jurasic",
    fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
  },
  {
    species: "Stegosaurus",
    weight: 11600,
    height: 79,
    diet: "herbavor",
    where: "North America, Europe, Asia",
    when: "Late Jurasic to Early Cretaceous",
    fact: "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
  },
  {
    species: "Elasmosaurus",
    weight: 16000,
    height: 59,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
  },
  {
    species: "Pteranodon",
    weight: 44,
    height: 20,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
  },
  {
    species: "Pigeon",
    weight: 0.5,
    height: 9,
    diet: "herbavor",
    where: "World Wide",
    when: "Holocene",
    fact: "All birds are living dinosaurs.",
  },
];
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
    this.dinoTaller = function (dino) {
      if (dino.height > this.height) {
        return true;
      }
    };
    this.dinoHeavier = function (dino) {
      if (dino.weight > this.weight) {
        return true;
      }
    };
    this.sameDiet = function (dino) {
      if (dino.diet === this.diet) {
        return true;
      }
    };
  }
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
    const weightInput = Number(document.getElementById("weight").value);
    const feetInput = Number(document.getElementById("feet").value);
    const inchesInput = Number(document.getElementById("inches").value);
    const totalHeightInFeet = feetInput + 0.083 * inchesInput;
    const dietInput = document.getElementById("diet").value.toLowerCase();

    this.human = new Human(
      nameInput,
      species,
      weightInput,
      totalHeightInFeet,
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
  inputForm.innerHTML = " ";
  const grid = document.getElementById("grid");
  const dinos = dataHandling.sendDinos();

  for (const dino of dinos) {
    switch (dino.species) {
      case "Pigeon":
        break;
      case "Triceratops":
        if (human.dinoTaller(dino)) {
          dino.fact = `You are smaller than ${dino.species}`;
        } else {
          dino.fact = `You are taller than ${dino.species}`;
        }
        break;
      case "Tyrannosaurus Rex":
        if (human.sameDiet(dino)) {
          dino.fact = `You have the same diet as ${dino.species}`;
        } else {
          dino.fact = `You have a different diet than ${dino.species}`;
        }
        break;
      case "Anklyosaurus":
        if (human.dinoHeavier(dino)) {
          dino.fact = `You are lighter than ${dino.species}`;
        } else {
          dino.fact = `You are heavier than ${dino.species}`;
        }
        break;
      case "Brachiosaurus":
        if (human.sameDiet(dino)) {
          dino.fact = `You have the same diet as ${dino.species}`;
        } else {
          dino.fact = `You have a different diet than ${dino.species}`;
        }
        break;
      case "Stegosaurus":
        if (human.dinoTaller(dino)) {
          dino.fact = `You are smaller than ${dino.species}`;
        } else {
          dino.fact = `You are taller than ${dino.species}`;
        }
        break;
      case "Elasmosaurus":
        if (human.dinoHeavier(dino)) {
          dino.fact = `You are lighter than ${dino.species}`;
        } else {
          dino.fact = `You are heavier than ${dino.species}`;
        }
        break;
      case "Pteranodon":
        if (human.sameDiet(dino)) {
          dino.fact = `You have the same diet as ${dino.species}`;
        } else {
          dino.fact = `You have a different diet than ${dino.species}`;
        }
        break;
      default:
        break;
    }
  }

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
}
