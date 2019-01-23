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
    _setCanvasDimensions: function () {
        this.w = window.innerWidth
        this.h = window.innerHeight

        this.canvas
            .setAttribute("width", window.innerWidth);

        this.canvas
            .setAttribute("height", window.innerHeight)
    },
    _setHandlers: function () {
        window.onresize = () => {
            this._setCanvasDimensions()
            this.playScreen = new PlayScreen(this)
        }
    },
    _listener: function () {
        document.onkeydown = (e) => this.handleKeyDown(e.keyCode)
        document.onkeyup = (e) => this.handleKeyUp(e.keyCode)
    },
    init: function () {
        this.canvas = document.querySelector("#spaceGame")
        this.ctx = this.canvas.getContext("2d")
        this.fps = 60
        this._setCanvasDimensions()
        this._setHandlers()
        this._listener()

        this.reset()
        this.clear()
        this.start()
    },
    start: function() {
        this.interval = setInterval(() => {
            this.clear()
            this.framesCounter++
            
            if (this.framesCounter % 2 === 0) {
                this.playerOne.deleteTrack()
                this.playerTwo.deleteTrack() 
            } 
            if (this.framesCounter > 1000) {
                this.framesCounter = 1
            }
            /* if (this.framesCounter % 50 === 0) {
                this.generatePlanet()
            } */

            this.moveAll()
            this.drawAll()
            this.trackAll()
            /* if (this.colisionTrail()) {
                console.log("colision")
            } */
            if (this.colisionBetweenRockets(this.playerOne, this.playerTwo)) {
                this.gameOver("Player Two Won")
            }
            if (this.colisionBetweenRockets(this.playerTwo, this.playerOne)) {
                this.gameOver("Player One Won")
            }
            /* if (this.colisionFrame(this.playerOne)){
                this.gameOver("Player one")
            } */ /* else if (this.colisionFrame(this.playerTwo)) {
                this.gameOver("Player two")
            } */
        }, 1000/this.fps)
    },
    stop: function () {
        clearInterval(this.interval)
    },
    clear: function () {
        this.ctx.fillStyle = "#282828"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },
    drawAll: function () {
        this.playScreen.draw()
        this.playerOne.drawTrack("#ff0000")
        this.playerTwo.drawTrack("#cc5500")
        this.playerOne.draw()
        this.playerTwo.draw()
    },
    moveAll: function () {
        this.playerOne.move()
        this.playerTwo.move()
    },
    trackAll: function () {
        this.playerOne.savePosition()
        this.playerTwo.savePosition()
    },
    reset: function () {
        this.playScreen = new PlayScreen(this)
        this.playerOne = new Rocket(this, this.playScreen)
        this.playerTwo = new Rocket(this, this.playScreen)
    },
    generatePlanet: function () {

    },
    colisionTrail: function () {
        if(this.playerOne.trail.length > 80) {
        return this.playerOne.trail.some((e) => {
            if (e.posX < this.playerOne.x + this.playerOne.width &&
            e.posX  > this.playerOne.x &&
            e.posY < this.playerOne.y + this.playerOne.height &&
            e.posY  > this.playerOne.y) {
                debugger
                return true
            }
                return false
            })
    }
    },
    colisionBetweenRockets: function (player1, player2) {
        if(player1.trail.length > 10) {
            return player1.trail.some((e) => {
                if (e.posX < player2.x + player2.width &&
                    e.posX  > player2.x &&
                    e.posY < player2.y + player2.height &&
                    e.posY  > player2.y){
                    return true
                }
                    return false
                })
        }
    },
    colisionFrame: function (player) {
        return (
            (player.y <= this.playScreen.y) ||
            (player.y >= this.playScreen.y + this.playScreen.height) ||
            (player.x <= this.playScreen.x) ||
            (player.x >= this.playScreen.x + this.playScreen.width)
            )
    },
    gameOver: function (playerWinner) {
        this.stop()
        if (confirm(`
        ${playerWinner} won the game
        Do you want to play again?`)) {
            this.reset()
            this.init("myGame")
        }
    },
    handleKeyUp: function (key) {
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
    handleKeyDown: function (key) {
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
            this.stop()
            break;
            case this.key.num2:
            this.start()
            break;
        }
    },
}