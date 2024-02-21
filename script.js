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
  }
}
const hero1 = new Hero(100, 1, "Adam", 2);
const monster1 = new Monster(100, 1, "slime", 1);
let monsterTurnBaseDamage = 0;
let heroTurnBaseDamage = 0;
let gameContinue = true;

while (gameContinue) {
  // Load stuff
  console.log(hero1);
  console.log(monster1);
  // Monster turn
  monsterTurnBaseDamage = Math.floor(Math.random() * 10);
  hero1.damage(monsterTurnBaseDamage);
  console.log(hero1);
  console.log(monster1);
  if (monster1.hPoints < 1 || hero1.hPoints < 1) {
    gameContinue = false;
    break;
  }
  // Hero turn
  heroTurnBaseDamage = Math.floor(Math.random() * 10) + hero1.skillLevel;
  monster1.damage(heroTurnBaseDamage);
  console.log(hero1);
  console.log(monster1);
  if (monster1.hPoints < 1 || hero1.hPoints < 1) {
    gameContinue = false;
    break;
  }
}
