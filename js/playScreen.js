function PlayScreen(game) {
    this.game = game
    this.width = 600
    this.height = 600
    this.x = (this.game.canvas.width - this.width) / 2
    this.y = (this.game.canvas.height - this.height) / 2
}

PlayScreen.prototype.draw = function () {
    this.game.ctx.strokeStyle = "#fff"
    this.game.ctx.strokeRect(this.x, this.y, this.width, this.height)
}

PlayScreen.prototype.constructor = PlayScreen