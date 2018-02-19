new Vue({
  el: "#app",

  data: {
    playerHealth: 100,
    monsterHealth: 100,
    playerAttackValues: {
      min: 3,
      max: 10,
      specialMin: 10,
      specialMax: 20
    },
    playerHealingValue: 7,
    monsterAttackValues: {
      min: 5,
      max: 12
    },
    gameIsRunning: false,
    turns: []
  },

  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },

    attack: function() {
      this.playerAttack(
        this.playerAttackValues.min,
        this.playerAttackValues.max
      );

      if (this.checkWin()) {
         return;
      }

      this.monsterAttack(
        this.monsterAttackValues.min,
        this.monsterAttackValues.max
      );

      this.checkWin();
    },

    specialAttack: function() {
      this.playerAttack(
        this.playerAttackValues.specialMin,
        this.playerAttackValues.specialMax
      );

      if (this.checkWin()) {
        return;
     }

     this.monsterAttack(
      this.monsterAttackValues.min,
      this.monsterAttackValues.max
     );

     this.checkWin();
    },

    heal: function() {
      if (this.playerHealth <= 93) {
        this.playerHealth += this.playerHealingValue;
      } else {
        this.playerHealth = 100;
      }
      this.printHealLog(this.playerHealingValue);

      this.monsterAttack(
        this.monsterAttackValues.min,
        this.monsterAttackValues.max
      );

      this.checkWin();
    },

    giveUp: function() {
      this.gameIsRunning = false;
    },

    // Helper functions
    playerAttack: function(min, max) {
      var damage = this.calculateDamage(min, max);
      this.monsterHealth -= damage;
      this.printAttackLog('Player', damage);
    },

    monsterAttack: function(min, max) {
      var damage = this.calculateDamage(min, max);
      this.playerHealth -= damage;
      this.printAttackLog('Monster', damage);
    },

    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    checkWin: function() {
      if (this.monsterHealth <= 0) {
        confirm('You won! New game?') ? this.startGame() : this.gameIsRunning = false;
        return true;
      } else if (this.playerHealth <= 0) {
        confirm('You lost. New game?') ? this.startGame() : this.gameIsRunning = false;
        return true;
      }

      return false;
    },

    printAttackLog: function(role, damage) {
      if (role === 'Player') {
        this.turns.unshift({
          isPlayer: true,
          text: 'Player hits Monster for ' + damage
        });
      } else if (role === 'Monster') {
        this.turns.unshift({
          isPlayer: false,
          text: 'Monster hits Player for ' + damage
        });
      } else {
        alert('Error!!! Neither the player nor the monster attacked.');
      }
    },

    printHealLog: function(healingAmount) {
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for ' + healingAmount
      });
    }
  }
});