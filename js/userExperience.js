function UserExperience(game) {
    this.game = game
    this.playScreen = this.game.playScreen
    this.gameOverButtonWidth = 400
    this.gameOverButtonHeight = 100
    this.gameOverButtonPosX = this.playScreen.x + (this.playScreen.width / 2) - (this.gameOverButtonWidth / 2)
    this.gameOverButtonPosY = this.playScreen.y + (this.playScreen.height * 0.6)
    this.gameOverTextPosX = this.playScreen.y + (this.playScreen.height * 0.6) + (this.gameOverButtonHeight * 0.5)
    this.gameOverTextPosY = this.playScreen.y + (this.playScreen.height * 0.6) + (this.gameOverButtonHeight * 0.5)
    this.winner = undefined
}

UserExperience.prototype.gameOver = function (player) {
    let message = undefined
		this.game.stop();
		switch (player) {
			case 1:
				message = `${this.game.playerOne.name} WON`
				break;
			case 2:
				message = `${this.game.playerTwo.name} WON`
		}
    setTimeout(() => {
        this.game.ctx.fillStyle = "rgba(60,25,134,0.8)"
        this.game.ctx.fillRect( this.playScreen.x , this.playScreen.y , 700, 600)
        this.game.ctx.fillStyle = "#fff"
        this.game.ctx.fillRect(  this.gameOverButtonPosX , this.gameOverButtonPosY , this.gameOverButtonWidth, this.gameOverButtonHeight)
        this.game.ctx.font = "50px Arial"
        this.game.ctx.fillText(message, this.gameOverTextPosX, this.gameOverTextPosY)
        this.game.ctx.fillStyle = "#000"
        this.game.ctx.font = "30px Arial"
        this.game.ctx.fillText("Restart Game?", this.gameOverButtonPosX, this.gameOverTextPosY)
    },10)

}

UserExperience.prototype.music = function () {
    
}