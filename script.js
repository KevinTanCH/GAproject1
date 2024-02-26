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
  constructor(name = "skin", cost = 0, damageResist = [0, 0, 0]) {
    super(name, cost);
    this.damageResist = damageResist;
  }
  changeEquipment(arrEquipStat) {
    this.name = arrEquipStat[0];
    this.cost = arrEquipStat[1];
    this.damageResist = arrEquipStat[2]; // 0Pierce1Hack2Blunt
  }
}
class Weapons extends Items {
  constructor(
    name = "fist",
    cost = 0,
    damageType = 2, // 0Pierce1Hack2Blunt
    damagePoints = 1,
    damageChance = 1,
    blockResist = [0, 0, 0],
    counterChance = 0
  ) {
    super(name, cost);
    this.damageType = damageType;
    this.damagePoints = damagePoints;
    this.damageChance = damageChance;
    this.blockResist = blockResist;
    this.counterChance = counterChance;
  }
  changeWeapon(arrWeaponStat) {
    this.name = arrWeaponStat[0];
    this.cost = arrWeaponStat[1];
    this.damageType = arrWeaponStat[2]; // 0Pierce1Hack2Blunt
    this.damagePoints = arrWeaponStat[3];
    this.damageChance = arrWeaponStat[4];
    this.blockChance = arrWeaponStat[5];
    this.counterChance = arrWeaponStat[6];
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
    if (amount > 0) {
      this.hPoints -= amount;
    } else {
      amount = 0;
    }
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
  constructor(hPoints, maxHP, charLevel, name, weaponSet, skillLevel = 1) {
    super(hPoints, maxHP, charLevel, name);
    this.weaponSet = weaponSet;
    this.skillLevel = skillLevel;
  }
  setWeaonSet(Set1or2) {
    this.weaponSet = Set1or2;
  }
  levelUp() {
    this.skillLevel++;
    this.charLevel++;
  }
}
class Monster extends Character {
  constructor(
    hPoints,
    maxHP,
    charLevel,
    name,
    skillLevel = 1,
    damageType,
    damageResist = [0, 0, 0]
  ) {
    super(hPoints, maxHP, charLevel, name);
    this.skillLevel = skillLevel;
    this.damageType = damageType; // 0Pierce1Hack2Blunt
    this.damageResist = damageResist;
    // Not sure if need skill level for monsters, stretch goals?
  }
  changeMonster(arrMonsterStat) {
    this.hPoints = arrMonsterStat[0];
    this.maxHP = arrMonsterStat[1];
    this.charLevel = arrMonsterStat[2];
    this.name = arrMonsterStat[3];
    this.skillLevel = arrMonsterStat[4];
    this.damageType = arrMonsterStat[5]; // 0Pierce1Hack2Blunt
    this.damageResist = arrMonsterStat[6];
  }
}

/*----- Constants -----*/
// Weapon types here NameCostTypePointsChanceResistCounter
// Range
const arrWpnBow = ["Bow", 2, 0, 10, 10, [0, 0, 0], 0];
const arrWpnWrBow = ["WarBow", 15, 0, 20, 10, [0, 0, 0], 0];
// 2 Hands
const arrWpnSpear = ["Spear", 2, 0, 10, 10, [0, 0, 0], 0];
const arrWpnBttlAxe = ["BattletAxe", 10, 1, 20, 10, [0, 0, 0], 0];
const arrWpnWrHmmr = ["WarHammer", 10, 2, 20, 10, [0, 0, 0], 0];
const arrWpnGrtSwd = ["GreatSword", 15, 1, 15, 20, [0, 0, 0], 15];
// 1 Hand
const arrWpnSword = ["Sword", 3, 1, 10, 10, [0, 10, 10], 10];
const arrWpnRapier = ["Rapier", 3, 1, 10, 10, [0, 10, 10], 10];
const arrWpnAxe = ["Axe", 3, 1, 10, 10, [0, 10, 10], 10];
const arrWpnMace = ["Mace", 3, 1, 10, 10, [0, 10, 10], 10];
const arrWpnBuckle = ["Buckler", 3, 2, 2, 5, [20, 20, 20], 20];
const arrWpnShield = ["Shield", 3, 2, 2, 5, [20, 20, 20], 20];
// Equipment types here NameCostResist
const arrEqpShirt = ["Shirt", 0, [0, 0, 0]];
const arrEqpGambe = ["Gambeson", 10, [5, 5, 5]];
const arrEqpChain = ["Chainmail", 25, [5, 10, 5]];
const arrEqpPltMl = ["Platemail", 30, [10, 15, 5]];
const arrEqpFllPlt = ["FullPlate", 75, [20, 20, 20]];
// Monster types here HpMaxhpCharNameSkillTypeResist
const arrMonstSlime = [25, 25, 1, "Slime", 1, 2, [0, 0, 0]];
const arrMonstSkele = [50, 50, 2, "Skeleton", 1, 2, [10, 0, 0]];
const arrMonstCent = [150, 150, 3, "Centaur", 6, 0, [0, 0, 0]];
const arrMonstMant = [200, 200, 3, "Manticore", 5, 0, [0, 0, 0]];
const arrMonstChim = [200, 200, 3, "Chimera", 4, 1, [3, 3, 3]];
const arrMonstMino = [200, 200, 3, "Minotaur", 8, 0, [5, 5, 5]];
const arrMonstCyclo = [400, 400, 5, "Cyclops", 10, 2, [0, 5, 5]];
const arrMonstHydra = [500, 500, 5, "Hydra", 15, 1, [10, 10, 0]];
const arrMonstColo = [500, 500, 5, "Colossus", 20, 2, [10, 10, 10]];
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

/*----- Instances -----*/
const hero1 = new Hero(100, 100, 1, "Adam", 1, 1);
const hero1WpnSet1 = new Weapons(...arrWpnGrtSwd);
const hero1WpnSet2R = new Weapons(...arrWpnSword);
const hero1WpnSet2L = new Weapons(...arrWpnShield);
const Hero1EqpmtSet = new Equipments(...arrEqpShirt);
const monster1 = new Monster(...arrMonstSlime);
// Global Variables
let boolDebugMode = false;
boolSaveGameExist = false;
let intCoins = 10;
let intDangerLevel = 0;
let intTownModeCounter = 0;
const kvpConsumables = { potsHP: 0 };
const kvpWeapons = {
  Bow: 0,
  WarBow: 0,
  Spear: 0,
  BattletAxe: 0,
  WarHammer: 0,
  GreatSword: 0,
  Sword: 0,
  Rapier: 0,
  Axe: 0,
  Mace: 0,
  Buckler: 0,
  Shield: 0,
};
const kvpArmour = { Gambeson: 0, Chainmail: 0, Platemail: 0, FullPlate: 0 };
let intMonsterTurnBaseDamage = 0;
let intHeroTurnBaseDamage = 0;
let boolCounter = false;
let boolCombatEnd = true;
let boolGameContinue = true;

/*----- Event listeners -----*/
// CombatButtons
document.querySelector(".Button1").addEventListener("click", fnHeroAttack1);
document.querySelector(".Button2").addEventListener("click", fnHeroAttack2);
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
document.querySelector(".BtnLoadGame").addEventListener("click", fnLoadGame);
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
function fnSpawnMonster() {
  console.log("Spawning monster");
  if (intDangerLevel < 10) {
    monster1.changeMonster(arrMonstAllList[intDangerLevel - 1]);
  } else {
    monster1.changeMonster(arrMonstCyclo);
  }
  monster1.heal(monster1.maxHP);
  return;
}
function fnMonsterTurn() {
  console.log("Monster Turn");
  if (fnCheckCombatEnd()) {
    return;
  }
  intMonsterTurnBaseDamage =
    Math.round(Math.random() * 10) + monster1.skillLevel;
  console.log(intMonsterTurnBaseDamage);
  let HeroBlockWeapon = fnCheckHeroWeaponSet("Block");
  console.log(HeroBlockWeapon);
  console.log(HeroBlockWeapon.counterChance);
  console.log(hero1.skillLevel);
  if (
    HeroBlockWeapon.counterChance + hero1.skillLevel >
    intMonsterTurnBaseDamage
  ) {
    intMonsterTurnBaseDamage =
      intMonsterTurnBaseDamage -
      HeroBlockWeapon.blockResist[monster1.damageType];
    console.log(intMonsterTurnBaseDamage);
  }
  console.log(Hero1EqpmtSet);
  intMonsterTurnBaseDamage =
    intMonsterTurnBaseDamage - Hero1EqpmtSet.damageResist[monster1.damageType];
  console.log(intMonsterTurnBaseDamage);
  hero1.damage(intMonsterTurnBaseDamage);
  console.log(hero1);
  console.log(monster1);
  fnCmbtMnstrText();
  fnUpdateCombatGridHP();
  if (fnCheckCombatEnd()) {
    return;
  }
  return;
}
function fnCheckHeroWeaponSet(Text) {
  let whichWeapon = hero1.weaponSet;
  if (whichWeapon === 1) {
    whichWeapon = hero1WpnSet1;
  } else if (whichWeapon === 2) {
    if (Text === "Block") {
      whichWeapon = hero1WpnSet2L;
    } else {
      whichWeapon = hero1WpnSet2R;
    }
  }

  return whichWeapon;
}
function fnHeroAttack1() {
  hero1.weaponSet = 1;
  fnHeroTurn(1);
  return;
}
function fnHeroAttack2() {
  hero1.weaponSet = 2;
  fnHeroTurn(2);
  return;
}
function fnHeroTurn(Num) {
  console.log("Hero Turn");
  if (fnCheckCombatEnd()) {
    return;
  }

  hero1.setWeaonSet(Num);
  console.log("Hero using weapon set: " + Num);
  let HeroAttackWeapon = fnCheckHeroWeaponSet();
  intHeroTurnBaseDamage =
    Math.round(Math.random() * 10) +
    hero1.skillLevel +
    HeroAttackWeapon.damagePoints;
  intHeroTurnBaseDamage =
    intHeroTurnBaseDamage - monster1.damageResist[HeroAttackWeapon.damageType];
  monster1.damage(intHeroTurnBaseDamage);
  console.log(hero1);
  console.log(monster1);
  fnCmbtHeroText();
  fnUpdateCombatGridHP();
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
    fnContText(
      `Defeated ${monster1.name}. Level ${hero1.charLevel} hero ${hero1.name} has ${hero1.hPoints} out of ${hero1.maxHP} HP. HP Potions: ${kvpConsumables.potsHP}. Coints: ${intCoins}.`
    );
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
    fnContText("Tactical retreat success");
    fnTownMode();
    return;
  } else {
    console.log("Tactical retreat failed");
    fnCmbtHeroText("Tactical retreat failed");
    fnMonsterTurn();
    return;
  }
}
function fnCmbtMnstrText() {
  let elements = document.getElementsByClassName("MonsterText");
  let damageTypeText = fnDamageTypeText(monster1.damageType);
  elements[0].innerText = `${monster1.name} attacks ${hero1.name} dealing ${intMonsterTurnBaseDamage} ${damageTypeText} damage.`;
  return;
}
function fnCmbtHeroText(text) {
  let elements = document.getElementsByClassName("HeroText");
  if (text) {
    elements[0].innerText = text;
    return;
  } else {
    let whichWeapon = fnCheckHeroWeaponSet();
    let damageTypeText = fnDamageTypeText(whichWeapon.damageType);
    elements[0].innerText = `${hero1.name} attacks ${monster1.name} with ${whichWeapon.name} dealing ${intHeroTurnBaseDamage} ${damageTypeText} damage.`;
    return;
  }
  return;
}
function fnDamageTypeText(num) {
  // 0Pierce1Hack2Blunt
  switch (num) {
    case 0:
      return "Pierce";
    case 1:
      return "Hack";
    default:
      return "Blunt";
  }
}
function fnUpdateCombatGridHP() {
  let elements = document.getElementsByClassName("Hero1Name");
  elements[0].innerText = `${hero1.name}`;
  elements = document.getElementsByClassName("Hero1HP");
  elements[0].innerText = `${hero1.hPoints}/${hero1.maxHP}`;
  elements = document.getElementsByClassName("Monster1Name");
  elements[0].innerText = `${monster1.name}`;
  elements = document.getElementsByClassName("Monster1HP");
  elements[0].innerText = `${monster1.hPoints}/${monster1.maxHP}`;
  return;
}

// Continue mode
function fnContToTown() {
  fnTownMode();
}
function fnContPotionHeal() {
  console.log("Potion Heal");
  if (kvpConsumables.potsHP > 0) {
    kvpConsumables.potsHP--;
    hero1.heal(50);
    console.log(hero1);
  } else if (hero1.hPoints === hero1.maxHP) {
    console.log("HP already MAX");
  } else {
    console.log("No more potions");
  }
  fnContText(
    `Level ${hero1.charLevel} hero ${hero1.name} has ${hero1.hPoints} out of ${hero1.maxHP} HP. HP Potions: ${kvpConsumables.potsHP}. Coints: ${intCoins}.`
  );
  return;
}
function fnContToCmbt() {
  console.log("Combat start");
  fnUIContToCmbt();
  boolCombatEnd = false;
  intDangerLevel++;
  console.log("Danger Level: " + intDangerLevel);
  fnSpawnMonster();
  fnMonsterTurn();
  fnCmbtHeroText(`Awaiting hero turn.`);
  return;
}
function fnContText(Text) {
  let elements = document.getElementsByClassName("ContinueConsoleText");
  elements[0].innerText = Text;
}

// Town mode
function fnTownMode() {
  console.log("Combat Ends, start town");
  fnUIContToTown();
  boolCombatEnd = true;
  intDangerLevel = 0;
  console.log("Danger Level: " + intDangerLevel);
  fnTownText();
}
function fnBuyItems() {
  if (intCoins < potionHP.cost) {
    console.log("Not enough coins!");
    fnTownText();
    return;
  } else {
    intCoins = intCoins - potionHP.cost;
    kvpConsumables.potsHP++;
    console.log(kvpConsumables);
    console.log("Coins: " + intCoins);
    fnTownText();
    return;
  }
}
function fnTownHeal() {
  console.log("Town heal");
  if (hero1.hPoints === hero1.maxHP) {
    console.log("HP already MAX");

    fnUIContToTown();
    return;
  } else if (intCoins < 1) {
    console.log("No Coins: " + intCoins);
    fnTownText();
    return;
  } else {
    intCoins--;
    hero1.heal(50);
    console.log(hero1);
    console.log("Coins: " + intCoins);
    fnTownText();
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
    fnTownText();
    return;
  } else if (intCoins < 1) {
    console.log("No Coins: " + intCoins);
    fnTownText();
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
  fnSpawnMonster();
  console.log(monster1);
  fnMonsterTurn();
  fnCmbtHeroText(`Awaiting hero turn.`);
  return;
}
function fnTownText() {
  let elements = document.getElementsByClassName("TownConsoleText");
  elements[0].innerText = `Welcome to town. Level ${hero1.charLevel} hero ${hero1.name} has ${hero1.hPoints} out of ${hero1.maxHP} HP. HP Potions: ${kvpConsumables.potsHP}. Coints: ${intCoins}.`;
  return;
}

// Start mode
function fnStartGame() {
  console.log("Start game, start town");
  fnUIStartToTown();
  boolCombatEnd = true;
  intDangerLevel = 0;
  console.log("Danger Level: " + intDangerLevel);
  fnTownText();
  return;
}
function fnLoadGame() {
  let btnToDisableClassName = this.classList;
  console.log(btnToDisableClassName);
  const btnToDisable = document.getElementsByClassName(btnToDisableClassName);
  btnToDisable[0].disabled = true;
  return;
}

// GAME STARTS HERE
function initialize() {
  fnStartText();
  console.log("Load Game");
  console.log(hero1);
  console.log(monster1);
  fnUpdateCombatGridHP();
  console.log("Game Loaded");
  fnShowElements("StartMenuUI");
  if (boolDebugMode) {
    fnDebugMode();
  }
}
function fnStartText() {
  let elements = document.getElementsByClassName("StartMenuConsole");
  if (boolSaveGameExist) {
    elements[0].innerText = `Previous save exist`;
  } else {
    elements[0].innerText = `No existing save file.`;
  }
  return;
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
