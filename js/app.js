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
    monsterAttackValues: {
      min: 5,
      max: 12
    },
    gameIsRunning: false
  },

  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
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
        this.playerHealth += 7;
      } else {
        this.playerHealth = 100;
      }

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
      this.monsterHealth -= this.calculateDamage(min, max);
    },

    monsterAttack: function(min, max) {
      this.playerHealth -= this.calculateDamage(min, max);
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
    }
  }
});