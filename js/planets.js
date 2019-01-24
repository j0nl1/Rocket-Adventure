function Planet(game, img) {
    this.game = game
    this.playScreen = this.game.playScreen
    this.img = img
    this.x = this.playScreen.x + 100 + (Math.random() * (this.playScreen.width - 200))
    this.y = this.playScreen.y + 100 + (Math.random() * (this.playScreen.height - 200))
    this.width = 40
    this.height = 40
    this.power = img.power
}


Planet.prototype.draw = function () {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}