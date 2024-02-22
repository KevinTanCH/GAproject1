// Classes here
class Character {
  constructor(hPoints = 100, maxHP = 100, charLevel = 1, name = "?name?") {
    (this.hPoints = hPoints),
      (this.maxHP = maxHP),
      (this.charLevel = charLevel),
      (this.name = name);
  }
  damage(amount) {
    this.hPoints -= amount;
    return this.hPoints;
  }
  heal(amount) {
    if (this.hPoints + amount) {
      this.hPoints += amount;
      return this.hPoints;
    } else {
      this.hPoints = maxHP;
    }
  }
}
class Hero extends Character {
  constructor(hPoints, charLevel, name, skillLevel = 1) {
    super(hPoints, charLevel, name);
    this.skillLevel = skillLevel;
  }
}
class Monster extends Character {
  constructor(hPoints, charLevel, name, skillLevel = 1) {
    super(hPoints, charLevel, name);
    this.skillLevel = skillLevel;
    // Not sure if need skill level for monsters, stretch goals?
  }
}

let intCoins = 0;
const hero1 = new Hero(100, 1, "Adam", 2);
const monster1 = new Monster(75, 1, "Slime", 1);
let intMonsterTurnBaseDamage = 0;
let intHeroTurnBaseDamage = 0;
let boolCombatEnd = true;
let boolGameContinue = true;

// Load stuff
console.log("Load Game");
console.log(hero1);
console.log(monster1);

function monsterTurn() {
  console.log("Monster Turn");
  if (checkCombatEnd()) {
    return;
  }
  intMonsterTurnBaseDamage = Math.floor(Math.random() * 10);
  hero1.damage(intMonsterTurnBaseDamage);
  console.log(hero1);
  console.log(monster1);
}
function heroTurn() {
  console.log("Hero Turn");
  if (checkCombatEnd()) {
    return;
  }
  intHeroTurnBaseDamage = Math.floor(Math.random() * 10) + hero1.skillLevel;
  monster1.damage(intHeroTurnBaseDamage);
  console.log(hero1);
  console.log(monster1);
  monsterTurn();
}
function checkCombatEnd() {
  if (monster1.hPoints < 1) {
    boolGameContinue = false;
    intCoins++;
    console.log("Coins: " + intCoins);
    return true;
  } else if (hero1.hPoints < 1) {
    boolGameContinue = false;
    console.log("Game over");
    return true;
  } else {
    return false;
  }
}
document.querySelector(".Button1").addEventListener("click", heroTurn);
document.querySelector(".Button2").addEventListener("click", hideElements);
document.querySelector(".Button3").addEventListener("click", showElements);
// Game starts here
monsterTurn();
hideElements();
function hideElements() {
  let elements = document.getElementsByClassName("CombatGraphGrid");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("hidden");
  }
  elements = document.getElementsByClassName("Button4");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("hidden");
  }
}

function showElements() {
  let elements = document.getElementsByClassName("CombatGraphGrid");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("hidden");
  }
  elements = document.getElementsByClassName("Button4");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("hidden");
  }
}
// while (boolGameContinue) {
//   monsterTurn();
// }

/* disable and enable user click*/
function fnButtonDisable() {}
function fnButtonEnable() {}
