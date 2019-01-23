var Game = {
  canvas: undefined,
  ctx: undefined,
  w: undefined,
  h: undefined,
  fps: 60,
  key: {
    leftArrow: 37,
    rightArrow: 39,
    A: 65,
    D: 68,
    num1: 49,
    num2: 50
  },
  framesCounter: 0,
  _setCanvasDimensions: function() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.canvas.setAttribute("width", window.innerWidth);

    this.canvas.setAttribute("height", window.innerHeight);
  },
  _setHandlers: function() {
    window.onresize = () => {
      this._setCanvasDimensions();
      this.playScreen = new PlayScreen(this);
    };
  },
  _listener: function() {
    document.onkeydown = e => this.handleKeyDown(e.keyCode);
    document.onkeyup = e => this.handleKeyUp(e.keyCode);
  },
  init: function() {
    this.canvas = document.querySelector("#spaceGame");
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this._setCanvasDimensions();
    this._setHandlers();
    this._listener();

    this.reset();
    this.clear();
    setTimeout(this.start(), 3000);
  },
  start: function() {
    this.interval = setInterval(() => {
      this.clear();
      this.framesCounter++;

      if (this.colisionTrail(this.playerOne)) {
        this.gameOver(2);
      }
      if (this.colisionTrail(this.playerTwo)) {
        this.gameOver(1);
      }
      if (this.colisionBetweenRockets(this.playerOne, this.playerTwo)) {
        this.gameOver(1);
      }
      if (this.colisionBetweenRockets(this.playerTwo, this.playerOne)) {
        this.gameOver(2);
      } /* else if (this.colisionFrame(this.playerTwo)) {
                this.gameOver("Player two")
            } */
      /* if (this.colisionFrame(this.playerOne)){
                this.gameOver("Player one")
            } */ if (
        this.framesCounter % 2 ===
        0
      ) {
        this.playerOne.deleteTrack();
        this.playerTwo.deleteTrack();
      }
      /* if (this.framesCounter % 50 === 0) {
                this.generatePlanet()
            } */
      if (this.framesCounter > 1000) {
        this.framesCounter = 1;
      }

      this.moveAll();
      this.drawAll();
      this.trackAll();
    }, 1000 / this.fps);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  clear: function() {
    this.ctx.fillStyle = "#282828";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawAll: function() {
    this.playScreen.draw();
    this.playerOne.drawTrack();
    this.playerTwo.drawTrack();
    this.playerOne.draw();
    this.playerTwo.draw();
  },
  moveAll: function() {
    this.playerOne.move();
    this.playerTwo.move();
  },
  trackAll: function() {
    this.playerOne.savePosition();
    this.playerTwo.savePosition();
  },
  reset: function() {
    this.playScreen = new PlayScreen(this);
    this.playerOne = new Rocket(this, "Javi", "#ff0000");
    this.playerTwo = new Rocket(this, "Random Player", "#cc5500");
  },
  generatePlanet: function() {},
  colisionTrail: function(player) {
    let i = this.playerOne.trail.length - 50;
    if (player.trail.length > 80) {
      for (i; i >= 0; i--) {
        if (
          player.trail[i].posX < player.x + player.width &&
          player.trail[i].posX > player.x &&
          player.trail[i].posY < player.y + player.height &&
          player.trail[i].posY > player.y
        ) {
          return true;
        }
      }
    }
  },
  colisionBetweenRockets: function(player1, player2) {
    if (player1.trail.length > 10) {
      return player1.trail.some(e => {
        if (
          e.posX < player2.x + player2.width &&
          e.posX > player2.x &&
          e.posY < player2.y + player2.height &&
          e.posY > player2.y
        ) {
          return true;
        }
        return false;
      });
    }
  },
  colisionFrame: function(player) {
    return (
      player.y <= this.playScreen.y ||
      player.y >= this.playScreen.y + this.playScreen.height ||
      player.x <= this.playScreen.x ||
      player.x >= this.playScreen.x + this.playScreen.width
    );
  },
  gameOver: function(winner) {
    let message = undefined
    this.stop();
    switch(winner) {
      case 1: 
      message = `${this.playerOne.name} won the game!!`
      break;
      case 2:
      message = `${this.playerTwo.name} won the game!!`
    }
    if (
      confirm(`
        ${message}
        Do you want to play again?`)
    ) {
      this.reset();
      this.init("myGame");
    }
  },
  handleKeyUp: function(key) {
    switch (key) {
      case this.key.leftArrow:
        this.playerOne.angularSpeed = 0;
        break;
      case this.key.rightArrow:
        this.playerOne.angularSpeed = 0;
        break;
      case this.key.A:
        this.playerTwo.angularSpeed = 0;
        break;
      case this.key.D:
        this.playerTwo.angularSpeed = 0;
        break;
    }
  },
  handleKeyDown: function(key) {
    switch (key) {
      case this.key.leftArrow:
        this.playerOne.turnAngleSpeed(-5);
        break;
      case this.key.rightArrow:
        this.playerOne.turnAngleSpeed(5);
        break;
      case this.key.A:
        this.playerTwo.turnAngleSpeed(-5);
        break;
      case this.key.D:
        this.playerTwo.turnAngleSpeed(5);
        break;
      case this.key.num1:
        this.stop();
        break;
      case this.key.num2:
        this.start();
        break;
    }
  }
};
