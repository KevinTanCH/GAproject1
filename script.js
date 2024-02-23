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

class Character {
  constructor(hPoints = 50, maxHP = 50, charLevel = 1, name = "?name?") {
    (this.hPoints = hPoints),
      (this.maxHP = maxHP),
      (this.charLevel = charLevel),
      (this.name = name);
  }
  damage(amount) {
    this.hPoints -= amount;
    console.log(this.name, amount, this.hPoints);
    return this.hPoints;
  }
  heal(amount) {
    if (this.hPoints + amount < this.maxHP) {
      this.hPoints += amount;
      console.log(this.name, amount, this.hPoints);
      return this.hPoints;
    } else {
      this.hPoints = this.maxHP;
      console.log(this.name, amount, this.hPoints);
      return this.hPoints;
    }
  }
}
class Hero extends Character {
  constructor(hPoints, maxHP, charLevel, name, skillLevel = 1) {
    super(hPoints, maxHP, charLevel, name);
    this.skillLevel = skillLevel;
  }
}
class Monster extends Character {
  constructor(hPoints, maxHP, charLevel, name, skillLevel = 1) {
    super(hPoints, maxHP, charLevel, name);
    this.skillLevel = skillLevel;
    // Not sure if need skill level for monsters, stretch goals?
  }
}

//Variables
let intCoins = 10;
const kvpConsumables = { potsHP: 0 };
const kvpWeapons = { bow: 0 };
const kvpArmour = { Gambeson: 0, Chainmail: 0, Plate: 0 };
const hero1 = new Hero(100, 100, 1, "Adam", 2);
const monster1 = new Monster(75, 75, 1, "Slime", 1);
let intMonsterTurnBaseDamage = 0;
let intHeroTurnBaseDamage = 0;
let boolCombatEnd = true;
let boolGameContinue = true;

// Funtions
function fnMonsterTurn() {
  console.log("Monster Turn");
  if (fnCheckCombatEnd()) {
    return;
  }
  intMonsterTurnBaseDamage = Math.floor(Math.random() * 10);
  hero1.damage(intMonsterTurnBaseDamage);
  console.log(hero1);
  console.log(monster1);
  return;
}
function fnHeroTurn() {
  console.log("Hero Turn");
  if (fnCheckCombatEnd()) {
    return;
  }
  intHeroTurnBaseDamage = Math.floor(Math.random() * 10) + hero1.skillLevel;
  monster1.damage(intHeroTurnBaseDamage);
  console.log(hero1);
  console.log(monster1);
  if (fnCheckCombatEnd()) {
    return;
  }
  fnMonsterTurn();
}
function fnCheckCombatEnd() {
  if (monster1.hPoints < 1) {
    boolGameContinue = false;
    boolCombatEnd = false;
    intCoins++;
    console.log("Coins: " + intCoins);
    return true;
  } else if (hero1.hPoints < 1) {
    boolGameContinue = false;
    boolCombatEnd = false;
    console.log("Game over");
    return true;
  } else {
    return false;
  }
}

function fnTownHeal() {
  intCoins--;
  hero1.heal(50);
  console.log("coints: " + intCoins);
  return;
}
function fnBuyItems() {
  if (intCoins < potionHP.cost) {
    console.log("Not enough coins!");
    return;
  } else {
    intCoins = intCoins - potionHP.cost;
    kvpConsumables.potsHP++;
    console.log(kvpConsumables);
    console.log("coints: " + intCoins);
    return;
  }
}

function fnStartCombat() {
  boolCombatEnd = true;
  monster1.heal(monster1.maxHP);
  fnMonsterTurn();
  return;
}

/* disable and enable user click*/
function fnButtonDisable() {}
function fnButtonEnable() {}

// Load stuff
console.log("Load Game");
console.log(hero1);
console.log(monster1);

// CombatButtons
document.querySelector(".Button1").addEventListener("click", fnHeroTurn);
document.querySelector(".Button2").addEventListener("click", fnHideElements);
document.querySelector(".Button3").addEventListener("click", fnShowElements);
document.querySelector(".Button4").addEventListener("click", fnShowElements);
// TownButtons
document.querySelector(".BtnTownHeal").addEventListener("click", fnTownHeal);
document.querySelector(".BtnBuyPotsHP").addEventListener("click", fnBuyItems);
document.querySelector(".StartCombat").addEventListener("click", fnStartCombat);
// StartMenuButtons

// Game starts here
// fnHideElements("CombadModeUI");
// fnMonsterTurn();

function fnHideElements(elemToHide) {
  let elements = document.getElementsByClassName(elemToHide);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("hidden");
  }
  return;
}

function fnShowElements(elemToShow) {
  let elements = document.getElementsByClassName(elemToShow);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("hidden");
  }
  return;
}
