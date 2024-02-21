// Classes here
class Items {
  constructor(name = "?name?", cost = 1) {
    this.name = name;
    this.cost = cost;
  }
}
class Consumables extends Items {
  constructor(name, cost) {
    super(name, cost);
  }
}
class Equipments extends Items {
  constructor(name, cost) {
    super(name, cost);
  }
}
class Weapons extends Items {
  constructor(name, cost, damagePoints, damageType) {
    super(name, cost);
    this.damagePoints = damagePoints;
    this.damageType = damageType;
  }
}
const potionHP = new Consumables("HP potion", 2);
