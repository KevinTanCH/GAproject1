/*----- Classes -----*/
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
  constructor(hPoints = 1, maxHP = 1, charLevel = 1, name = "?name?") {
    (this.hPoints = hPoints),
      (this.maxHP = maxHP),
      (this.charLevel = charLevel),
      (this.name = name);
  }
  setKeyValue(key, value) {
    this.key = value;
  }
  getKeyValue(key) {
    // return this.key;
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
    } else if (this.hPoints === this.maxHP) {
      console.log(this.name, 0, this.hPoints);
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
  levelUp() {
    this.skillLevel++;
  }
}
class Monster extends Character {
  constructor(hPoints, maxHP, charLevel, name, skillLevel = 1) {
    super(hPoints, maxHP, charLevel, name);
    this.skillLevel = skillLevel;
    // Not sure if need skill level for monsters, stretch goals?
  }
  changeMonster(arrMonsterStat) {
    this.hPoints = arrMonsterStat[0];
    this.maxHP = arrMonsterStat[1];
    this.charLevel = arrMonsterStat[2];
    this.name = arrMonsterStat[3];
    this.skillLevel = arrMonsterStat[4];
  }
}

/*----- Variables -----*/
// Monster types here
const arrMonstSlime = [25, 25, 1, "Slime", 1];
const arrMonstSkele = [50, 50, 2, "Skeleton", 1];
const arrMonstMino = [100, 100, 3, "Minotaur", 3];
const arrMonstCyclo = [200, 200, 5, "Cyclops", 10];
const arrMonstList = [
  arrMonstSlime,
  arrMonstSkele,
  arrMonstMino,
  arrMonstCyclo,
];
// Global Variables
let boolDebugMode = false;
let intCoins = 10;
let intDangerLevel = 0;
let intTownModeCounter = 0;
const kvpConsumables = { potsHP: 0 };
const kvpWeapons = { bow: 0 };
const kvpArmour = { Gambeson: 0, Chainmail: 0, Plate: 0 };
let intMonsterTurnBaseDamage = 0;
let intHeroTurnBaseDamage = 0;
let boolCombatEnd = true;
let boolGameContinue = true;

/*----- Instances -----*/
const hero1 = new Hero(100, 100, 1, "Adam", 2);
const monster1 = new Monster(...arrMonstSlime);

/*----- event listeners -----*/
// CombatButtons
document.querySelector(".Button1").addEventListener("click", fnHeroTurn);
document.querySelector(".Button2").addEventListener("click", fnPotionHeal);
document.querySelector(".Button3").addEventListener("click", fnHideElements);
document.querySelector(".Button4").addEventListener("click", fnShowElements);
//ContinueButtons
document.querySelector(".BtnToTown").addEventListener("click", fnStartTown);
document
  .querySelector(".BtnContinuePotionHeal")
  .addEventListener("click", fnPotionHeal);
document
  .querySelector(".BtnContinueCombat")
  .addEventListener("click", fnStartCombat);
// TownButtons
document.querySelector(".BtnBuyPotsHP").addEventListener("click", fnBuyItems);
document.querySelector(".BtnTownHeal").addEventListener("click", fnTownHeal);
document.querySelector(".BtnLevelUp").addEventListener("click", fnTownLevelUp);
document
  .querySelector(".BtnStartCombat")
  .addEventListener("click", fnStartCombat);
// StartMenuButtons
document.querySelector(".BtnStartGame").addEventListener("click", fnStartGame);
document.querySelector(".BtnDebugGame").addEventListener("click", fnDebugMode);

/*----- functions -----*/
function fnMonsterTurn() {
  console.log("Monster Turn");
  if (fnCheckCombatEnd()) {
    return;
  }
  intMonsterTurnBaseDamage =
    Math.round(Math.random() * 10) + monster1.skillLevel;
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
  intHeroTurnBaseDamage = Math.round(Math.random() * 10) + hero1.skillLevel;
  monster1.damage(intHeroTurnBaseDamage);
  console.log(hero1);
  console.log(monster1);
  if (fnCheckCombatEnd()) {
    return;
  } else {
    fnMonsterTurn();
  }
  return;
}
function fnCheckCombatEnd() {
  if (monster1.hPoints < 1) {
    boolGameContinue = false;
    boolCombatEnd = false;
    intCoins += 3 * intDangerLevel;
    console.log("More Coins: " + intCoins);
    fnContinueMode();
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
function fnPotionHeal() {
  console.log("Potion Heal");
  if (kvpConsumables.potsHP > 0) {
    hero1.heal(50);
    return;
  }
  return;
}

function fnContinueMode() {
  fnHideElements("CombatModeUI");
  fnShowElements("ContinueMenuUI");
  return;
}

function fnStartTown() {
  console.log("Combat Ends, start town");
  boolCombatEnd = true;
  intDangerLevel = 0;
  console.log("Danger Level: " + intDangerLevel);
  fnHideElements("StartMenuUI");
  fnHideElements("ContinueMenuUI");
  fnShowElements("TownModeUI");
  return;
}
function fnTownHeal() {
  console.log("Town heal");
  if (hero1.hPoints === hero1.maxHP) {
    console.log("HP already MAX");
    return;
  } else if (intCoins < 1) {
    console.log("No Coins: " + intCoins);
    return;
  } else {
    intCoins--;
    hero1.heal(50);
    console.log("Coins: " + intCoins);
    return;
  }
}
function fnTownLevelUp() {
  if (intCoins > 0) {
    console.log("Town level up!");
    intCoins--;
    hero1.levelUp();
    console.log(hero1);
    console.log("Coins: " + intCoins);
    return;
  } else if (intCoins < 1) {
    console.log("No Coins: " + intCoins);
    return;
  } else {
    return;
  }
}
function fnBuyItems() {
  if (intCoins < potionHP.cost) {
    console.log("Not enough coins!");
    return;
  } else {
    intCoins = intCoins - potionHP.cost;
    kvpConsumables.potsHP++;
    console.log(kvpConsumables);
    console.log("Coins: " + intCoins);
    return;
  }
}
function fnStartCombat() {
  console.log("Combat start");
  fnHideElements("TownModeUI");
  fnShowElements("CombatModeUI");
  boolCombatEnd = false;
  intDangerLevel++;
  console.log("Danger Level: " + intDangerLevel);
  if (intDangerLevel < 5) {
    monster1.changeMonster(arrMonstList[intDangerLevel - 1]);
  } else {
    monster1.changeMonster(arrMonstCyclo);
  }
  monster1.heal(monster1.maxHP);
  fnMonsterTurn();
  return;
}
function fnStartGame() {
  console.log("Start town");
  boolCombatEnd = true;
  intDangerLevel = 0;
  console.log("Danger Level: " + intDangerLevel);
  fnHideElements("StartMenuUI");
  fnShowElements("TownModeUI");
  return;
}

// GAME STARTS HERE
function initialize() {
  console.log("Load Game");
  console.log(hero1);
  console.log(monster1);
  console.log("Game Loaded");
  fnShowElements("StartMenuUI");
  if (boolDebugMode) {
    fnShowElements("CombatModeUI");
    fnShowElements("ContinueMenuUI");
    fnShowElements("TownModeUI");
  }
}
initialize();
// window.onload = function () {
//   if (localStorage.getItem("hasCodeRunBefore") === null) {
//     /** Your code here. **/

//     localStorage.setItem("hasCodeRunBefore", true);
//   }
// };

function fnDebugMode() {
  // Reveals UI
  boolDebugMode = true;
  let elements = document.getElementsByClassName("StartMenuUI");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("hidden");
  }
  elements = document.getElementsByClassName("TownModeUI");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("hidden");
  }
  elements = document.getElementsByClassName("ContinueMenuUI");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("hidden");
  }
  elements = document.getElementsByClassName("CombatModeUI");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("hidden");
  }
  return;
}

function fnHideElements(elemToHide) {
  console.log("Hiding " + elemToHide);
  if (boolDebugMode) {
    return;
  } else {
    let elements = document.getElementsByClassName(elemToHide);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("hidden");
    }
    return;
  }
}

function fnShowElements(elemToShow) {
  console.log("Showing " + elemToShow);
  if (boolDebugMode) {
    return;
  } else {
    let elements = document.getElementsByClassName(elemToShow);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("hidden");
    }
    return;
  }
}
