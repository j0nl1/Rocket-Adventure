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


Planet.prototype.invertKeywords = function (player) {
    
}

Planet.prototype.ignoreFrames = function (player) {

}

Planet.prototype.incrementeSpeed = function (player) {

}

Planet.prototype.cleanTrail = function () {
    this.game.playerOne.trail = []
    this.game.playerTwo.trail = []
}