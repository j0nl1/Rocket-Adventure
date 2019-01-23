function Planet(game, img) {
    this.game = game
    this.playScreen = this.game.playScreen
    this.img = img
    this.x = Math.floor(Math.random() * ((this.playScreen.x + this.playScreen.width) - this.playScreen.x + 1)) + this.playScreen.x;
    this.y = Math.floor(Math.random() * ((this.playScreen.y + this.playScreen.height) - this.playScreen.y + 1)) + this.playScreen.y;
    this.width = 30
    this.height = 30
    this.power = img.power
}


Planet.prototype.draw = function () {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}


Planet.prototype.invertKeywords = function (player) { // Mars
    if(player.id == 1) {
        this.game.key.A = 68
        this.game.key.D = 65
        setTimeout(function() {
            this.game.key.A = 65
            this.game.key.D = 68
        },3000)
    }
    if(player.id == 2) {
        this.game.key.leftArrow = 39
        this.game.key.rightArrow = 37
        setTimeout(function() {
        this.game.key.leftArrow = 37
        this.game.key.rightArrow = 39
        },3000)
    }
    
}

Planet.prototype.ignoreFrames = function () {  // Jupiter
    this.game.playerOne.x 
}

Planet.prototype.reduceSpeed = function (player) { // Moon
    if (player.id == 1) {
        this.game.playerTwo.acceleration = 2
        setTimeout(function() {
        this.game.playerTwo.acceleration = 4
            }, 5000)
    }
    if (player.id == 2) {
        this.game.playerOne.acceleration = 2
        setTimeout(function() {
        this.game.playerOne.acceleration = 4
            }, 5000)
    }
}

Planet.prototype.cleanTrail = function () {  // Earth
    this.game.playerOne.trail = []
    this.game.playerTwo.trail = []
}