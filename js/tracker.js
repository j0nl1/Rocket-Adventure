function Tracker(game, player) {
    this.game = game
    this.player = player
    this.x = this.player.x
    this.y = this.player.y
    this.width = 30
    this.height = 30
    this.trail = []
}

Tracker.prototype.drawTrack = function () {
    this.game.ctx.fillStyle = "#fff"
    this.game.ctx.fillRect(this.x,this.y, 5, 5)
}

Tracker.prototype.push = function () {
    this.game.trailPlayerOne.push(this.trail)
    this.trail = []
}

Tracker.prototype.savePosition = function () {
    this.trail.push([this.x, this.y])
}