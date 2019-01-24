function collisions(game) {
	this.game = game
	this.playScreen = this.game.playScreen
	this.playerOne = this.game.playerOne
	this.playerTwo = this.game.playerTwo
	if (colisionTrail(this.playerOne)) {this.game.userExperience.gameOver(2)}
	if (colisionTrail(this.playerTwo)) {this.game.userExperience.gameOver(1)}
	if (colisionBetweenRockets(this.playerOne, this.playerTwo)) {this.game.userExperience.gameOver(1)}
	if (colisionBetweenRockets(this.playerTwo, this.playerOne)) {this.game.userExperience.gameOver(2)} 
	// if (colisionFrame(this.playerTwo)) {this.game.userExperience.gameOver(2)}
	// if (colisionFrame(this.playerOne)) {this.game.userExperience.gameOver(1)}
	colisionPlanet(this.playerOne)
	colisionPlanet(this.playerTwo)

	function colisionTrail(player) {
		let i = player.trail.length - 50;
		if (player.trail.length > 80) {
			for (i; i >= 0; i--) {
				if (
					player.trail[i].posX < player.x + player.width &&
					player.trail[i].posX > player.x &&
					player.trail[i].posY < player.y + player.height &&
					player.trail[i].posY > player.y &&
					player.invulnerable == false
				) {
					return true;
				}
			}
		}
	}
	function colisionBetweenRockets(player1, player2) {
		if (player1.trail.length > 10) {
			return player1.trail.some(e => {
				if (
					e.posX < player2.x + player2.width &&
					e.posX > player2.x &&
					e.posY < player2.y + player2.height &&
					e.posY > player2.y &&
					player2.invulnerable == false
				) {
					return true
				}
				return false
			});
		}
	}
	function colisionFrame(player) {
		return (
			player.y <= this.playScreen.y ||
			player.y >= this.playScreen.y + this.playScreen.height ||
			player.x <= this.playScreen.x ||
			player.x >= this.playScreen.x + this.playScreen.width
		)
	}
	function colisionPlanet(player) {
		if (this.game.planets.length > 0) {
			this.game.planets.some((e, i) => {
			if	(e.x < player.x + player.width &&
				e.x + e.width > player.x &&
				e.y < player.y + player.height &&
				e.y + e.height > player.y) 
			{
			e.power(player)
			this.game.planets.splice(i, 1)
			}
			return false
		})
	}
}
}	