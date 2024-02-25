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
const arrMonstCent = [150, 150, 3, "Centaur", 3];
const arrMonstMant = [200, 200, 3, "Manticore", 3];
const arrMonstChim = [200, 200, 3, "Chimera", 3];
const arrMonstMino = [200, 200, 3, "Minotaur", 3];
const arrMonstCyclo = [400, 400, 5, "Cyclops", 10];
const arrMonstHydra = [500, 500, 5, "Hydra", 10];
const arrMonstColo = [500, 500, 5, "Colossus", 10];
const arrMonstAllList = [
  arrMonstSlime,
  arrMonstSkele,
  arrMonstCent,
  arrMonstMant,
  arrMonstChim,
  arrMonstMino,
  arrMonstCyclo,
  arrMonstHydra,
  arrMonstColo,
];
// Global Variables
let boolDebugMode = true;
let intCoins = 10;
let intDangerLevel = 0;
let intTownModeCounter = 0;
const kvpConsumables = { potsHP: 0 };
const kvpWeapons = {
  Bow: 0,
  Spear: 0,
  BattletAxe: 0,
  WarHammer: 0,
  GreatSword: 0,
  Sword: 0,
  Rapier: 0,
  Axe: 0,
  Mace: 0,
  Shield: 0,
};
const kvpArmour = { Gambeson: 0, Chainmail: 0, Platemail: 0, Plate: 0 };
let intMonsterTurnBaseDamage = 0;
let intHeroTurnBaseDamage = 0;
let boolCombatEnd = true;
let boolGameContinue = true;

/*----- Instances -----*/
const hero1 = new Hero(100, 100, 1, "Adam", 2);
const monster1 = new Monster(...arrMonstSlime);

/*----- Event listeners -----*/
// CombatButtons
document.querySelector(".Button1").addEventListener("click", fnHeroTurn);
document.querySelector(".Button2").addEventListener("click", fnHeroTurn);
document.querySelector(".Button3").addEventListener("click", fnPotionHeal);
document.querySelector(".Button4").addEventListener("click", fnRunaway);
//ContinueButtons
document.querySelector(".BtnToTown").addEventListener("click", fnContToTown);
document
  .querySelector(".BtnContinuePotionHeal")
  .addEventListener("click", fnContPotionHeal);
document
  .querySelector(".BtnContinueCombat")
  .addEventListener("click", fnContToCmbt);
// TownButtons
document.querySelector(".BtnBuyPotsHP").addEventListener("click", fnBuyItems);
document.querySelector(".BtnTownHeal").addEventListener("click", fnTownHeal);
document.querySelector(".BtnLevelUp").addEventListener("click", fnTownLevelUp);
document
  .querySelector(".BtnTownToCombat")
  .addEventListener("click", fnTownToCombat);
// StartMenuButtons
document.querySelector(".BtnStartGame").addEventListener("click", fnStartGame);
document.querySelector(".BtnDebugGame").addEventListener("click", fnDebugMode);
// GameOverButtons
// document.querySelector(".BtnRestart").addEventListener("click", fnStartGame);

/*----- Functions -----*/
// Hide and Show UI, control player button choices
function fnUIStartToTown() {
  fnHideElements("StartMenuUI");
  fnShowElements("TownModeUI");
  return;
}
function fnUITownToCmbt() {
  fnHideElements("TownModeUI");
  fnShowElements("CombatModeUI");
}
function fnUICmbtToCont() {
  fnHideElements("CombatModeUI");
  fnShowElements("ContinueMenuUI");
  return;
}
function fnUIContToCmbt() {
  fnHideElements("ContinueMenuUI");
  fnShowElements("CombatModeUI");
  return;
}
function fnUIContToTown() {
  fnHideElements("ContinueMenuUI");
  fnShowElements("TownModeUI");
}
function fnUIGameOver() {
  fnHideElements("CombatModeUI");
  fnShowElements("GameOverUI");
}

// Combat Mode
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
  if (fnCheckCombatEnd()) {
    return;
  }
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
    boolGameContinue = true;
    boolCombatEnd = false;
    intCoins += 3 * intDangerLevel;
    console.log("More Coins: " + intCoins);
    fnUICmbtToCont();
    return true;
  } else if (hero1.hPoints < 1) {
    boolGameContinue = false;
    boolCombatEnd = false;
    console.log("Game over");
    fnUIGameOver();
    return true;
  } else {
    return false;
  }
}
function fnPotionHeal() {
  console.log("Potion Heal");
  if (kvpConsumables.potsHP > 0) {
    hero1.heal(50);
    console.log(hero1);
    fnMonsterTurn();
    return;
  } else {
    console.log("No more potions");
  }
  return;
}
function fnRunaway() {
  if (Math.random() > 0.5) {
    console.log("Tactical retreat success");
    fnTownMode();
    return;
  } else {
    console.log("Tactical retreat failed");
    fnMonsterTurn();
    return;
  }
}

// Continue mode
function fnContToTown() {
  fnTownMode();
}
function fnContPotionHeal() {
  console.log("Potion Heal");
  if (kvpConsumables.potsHP > 0) {
    hero1.heal(50);
    console.log(hero1);
    return;
  } else {
    console.log("No more potions");
  }
  return;
}
function fnContToCmbt() {
  console.log("Combat start");
  fnUIContToCmbt();
  boolCombatEnd = false;
  intDangerLevel++;
  console.log("Danger Level: " + intDangerLevel);
  if (intDangerLevel < 5) {
    monster1.changeMonster(arrMonstAllList[intDangerLevel - 1]);
  } else {
    monster1.changeMonster(arrMonstCyclo);
  }
  monster1.heal(monster1.maxHP);
  fnMonsterTurn();
  return;
}

// Town mode
function fnTownMode() {
  console.log("Combat Ends, start town");
  fnUIContToTown();
  boolCombatEnd = true;
  intDangerLevel = 0;
  console.log("Danger Level: " + intDangerLevel);
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
    console.log("Coins: " + intCoins);
    return;
  }
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
    console.log(hero1);
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
function fnTownToCombat() {
  console.log("Combat start");
  fnUITownToCmbt();
  boolCombatEnd = false;
  intDangerLevel++;
  console.log("Danger Level: " + intDangerLevel);
  if (intDangerLevel < 5) {
    monster1.changeMonster(arrMonstAllList[intDangerLevel - 1]);
  } else {
    monster1.changeMonster(arrMonstCyclo);
  }
  monster1.heal(monster1.maxHP);
  console.log(monster1);
  fnMonsterTurn();
  return;
}

// Start mode
function fnStartGame() {
  console.log("Start game, start town");
  fnUIStartToTown();
  boolCombatEnd = true;
  intDangerLevel = 0;
  console.log("Danger Level: " + intDangerLevel);

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
    fnDebugMode();
  }
}
initialize();

function fnDebugMode() {
  // Reveals all UI with debug button
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
  elements = document.getElementsByClassName("GameOverUI");
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
