import { Creature } from "./creature.js";

// Child Class
// can access Creature methods
// has an additional property: name
export class Human extends Creature {
  constructor(name, species, weight, height, diet) {
    super(species, weight, height, diet);
    this.name = name;
  }
}
