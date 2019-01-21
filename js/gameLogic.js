var Game = {
    canvas: undefined,
    ctx: undefined,
    w: undefined,
    h: undefined,
    fps: 60,
    key: {
        leftArrow: 37,
        rightArrow: 39
    },
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

        this.interval = setInterval(() => {
            this.clear()
            /* this.framesCounter++

            if (this.framesCounter > 1000) {
                this.framesCounter = 0
            }
            if (this.framesCounter % 50 === 0) {
                this.generatePlanet()
            } */

            this.moveAll()
            this.drawAll()
            if (this.colisionFrame()){
                console.log("colision")
                this.stop()
            }
        })
    },
    stop: function () {
        clearInterval(this.interval)
    },
    clear: function () {
        this.ctx.fillStyle = "#282828"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },
    drawAll: function () {
        this.playerOne.draw()
        this.playerTwo.draw()
        this.playScreen.draw()
    },
    moveAll: function () {
        this.playerOne.move()
        this.playerTwo.move()
    },
    reset: function () {
        this.playScreen = new PlayScreen(this)
        this.playerOne = new Rocket(this, this.playScreen)
        this.playerTwo = new Rocket(this, this.playScreen)
    },
    generatePlanet: function () {

    },
    colisionFrame: function () {
        if (
            (this.playerOne.y <= this.playScreen.y) ||
            (this.playerOne.y >= this.playScreen.y + this.playScreen.height) ||
            (this.playerOne.x <= this.playScreen.x) ||
            (this.playerOne.x >= this.playScreen.x + this.playScreen.width)
            ){
            return true
        }
    },
    handleKeyUp: function (key) {
        switch (key) {
            case 37:
            this.playerOne.angularSpeed = 0;
            break;
            case 39:
            this.playerOne.angularSpeed = 0;
            break;
            case 65:
            this.playerTwo.angularSpeed = 0;
            break;
            case 68:
            this.playerTwo.angularSpeed = 0;
            break;
        }
    },
    handleKeyDown: function (key) {
        switch (key) {
            case 37: 
            this.playerOne.turnAngleSpeed(-1);
            break;
            case 39:
            this.playerOne.turnAngleSpeed(1);
            break;
            case 65: 
            this.playerTwo.turnAngleSpeed(-1);
            break;
            case 68:
            this.playerTwo.turnAngleSpeed(1);
            break;
            case 49:
            this.stop()
            break;
            case 50:
            this.init()
            break;
        }
    },
}