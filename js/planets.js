function Planet(game, id) {
    this.game = game
    this.id = id
    this.x = Math.floor(Math.random() * ((this.playScreen.x + this.playScreen.width) - this.playScreen.x + 1)) + this.playScreen.x;
    this.y = Math.floor(Math.random() * ((this.playScreen.y + this.playScreen.height) - this.playScreen.y + 1)) + this.playScreen.y;
    this.width = 20
    this.height = 20
    this.img = new Image()
    this.img.src = undefined
    
}

Planet.prototype.generatePlanet = function () {

}

Planet.prototype.drawPlanet = function () {
    
}