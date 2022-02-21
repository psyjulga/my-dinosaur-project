// Base Class => Creature

export class Creature {
  constructor(species, weight, height, diet, fact, where, when) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.fact = fact;
    this.location = where;
    this.era = when;
  }
  // prototype methods to compare human to dino data
  // will be inherited by Human
  dinoTaller(dino) {
    if (dino.height > this.height) {
      return true;
    }
  }
  dinoHeavier(dino) {
    if (dino.weight > this.weight) {
      return true;
    }
  }
  sameDiet(dino) {
    if (dino.diet === this.diet) {
      return true;
    }
  }
}
