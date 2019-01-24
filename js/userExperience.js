function UserExperience(game) {
    this.game = game
    this.playScreen = this.game.playScreen
    this.gameOverButtonWidth = 400
    this.gameOverButtonHeight = 100
    this.gameOverButtonPosX = this.playScreen.x + (this.playScreen.width / 2) - (this.gameOverButtonWidth / 2)
    this.gameOverButtonPosY = this.playScreen.y + (this.playScreen.height * 0.6)
    this.gameOverTextPosX = this.gameOverButtonPosX + (this.gameOverButtonWidth / 2) - (this.gameOverButtonWidth * 0.3)
    this.gameOverTextPosY = this.playScreen.y + (this.playScreen.height * 0.6) + (this.gameOverButtonHeight * 0.6)
    this.winnerTextPosX = this.playScreen.x + (this.playScreen.width / 2) - 200
    this.winnerTextPosY = this.playScreen.y + (this.playScreen.height * 0.3)
    this.winner = undefined
}

UserExperience.prototype.gameOver = function (player) {
		this.game.stop();
		switch (player) {
			case 1:
				this.winner = this.game.playerOne.name
				break;
			case 2:
                this.winner = this.game.playerTwo.name
		}
    setTimeout(() => {
        this.game.ctx.fillStyle = "rgba(60,25,134,0.8)"
        this.game.ctx.fillRect( this.playScreen.x , this.playScreen.y , 700, 600)
        this.game.ctx.fillStyle = "#fff"
        this.game.ctx.fillRect(  this.gameOverButtonPosX , this.gameOverButtonPosY , this.gameOverButtonWidth, this.gameOverButtonHeight)
        this.game.ctx.font = "80px Orbitron"
        this.game.ctx.fillText(this.winner, this.winnerTextPosX, this.winnerTextPosY)
        this.game.ctx.fillText("WON", this.winnerTextPosX + 80, this.winnerTextPosY + 100)
        this.game.ctx.fillStyle = "#000"
        this.game.ctx.font = "30px Orbitron"
        this.game.ctx.fillText("Restart Game?", this.gameOverTextPosX, this.gameOverTextPosY)
    },10)
    document.getElementById("spaceGame").addEventListener("click", (e) => this.checkButtonRestart(e))
}

UserExperience.prototype.checkButtonRestart = function (e) {
    if(
        e.offsetX > this.gameOverButtonPosX && 
        e.offsetX < (this.gameOverButtonPosX + this.gameOverButtonWidth) &&
        e.offsetY > this.gameOverButtonPosY &&
        e.offsetY < (this.gameOverButtonPosY + this.gameOverButtonHeight)
        ){
            this.game.init()
        }
}

UserExperience.prototype.music = function () {
    
}