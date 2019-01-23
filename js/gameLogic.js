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
	planets: [],
	_setCanvasDimensions: function () {
		this.w = window.innerWidth;
		this.h = window.innerHeight;

		this.canvas.setAttribute("width", window.innerWidth);

		this.canvas.setAttribute("height", window.innerHeight);
	},
	_setHandlers: function () {
		window.onresize = () => {
			this._setCanvasDimensions();
			this.playScreen = new PlayScreen(this);
		};
	},
	_listener: function () {
		document.onkeydown = e => this.handleKeyDown(e.keyCode)
		document.onkeyup = e => this.handleKeyUp(e.keyCode)
	},
	init: function () {
		this.canvas = document.querySelector("#spaceGame")
		this.ctx = this.canvas.getContext("2d");
		this.fps = 60;
		this._setCanvasDimensions();
		this._setHandlers();
		this._listener();

		this.reset();
		this.clear();
		this.drawAll();
		setTimeout(() =>{
			this.start()
		}, 3000);
	},
	start: function () {
		this.interval = setInterval(() => {
			this.clear();
			this.framesCounter++;

			if (this.framesCounter % 2 === 0) {
				this.playerOne.deleteTrack();
				this.playerTwo.deleteTrack();
			}
			if (this.framesCounter % 300 === 0) {
				this.generatePlanet()
			}
			if (this.framesCounter > 14000) {
				this.framesCounter = 0;
			}
			collisions(this);
			this.moveAll();
			this.drawAll();
			this.trackAll();
		}, 1000 / this.fps);
	},
	stop: function () {
		clearInterval(this.interval);
	},
	clear: function () {
		this.ctx.fillStyle = "#282828";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	},
	drawAll: function () {
		this.playScreen.draw();
		this.playerOne.drawTrack();
		this.playerTwo.drawTrack();
		this.playerOne.draw();
		this.playerTwo.draw();
		this.planets.forEach((e) => {e.draw()})
	},
	moveAll: function () {
		this.playerOne.move();
		this.playerTwo.move();
	},
	trackAll: function () {
		this.playerOne.savePosition();
		this.playerTwo.savePosition();
	},
	reset: function () {
		this.playScreen = new PlayScreen(this)
		this.playerOne = new Rocket(this, imagesLoaded.redRocket ,"Javi" )
		this.playerTwo = new Rocket(this, imagesLoaded.blueRocket, "Random Player")
	},
	generatePlanet: function () {
		this.planets.push(new Planet(this, imagesLoaded.earth))
	},
	gameOver: function (winner) {
		let message = undefined
		this.stop();
		switch (winner) {
			case 1:
				message = `${this.playerOne.name} won the game!!`
				break;
			case 2:
				message = `${this.playerTwo.name} won the game!!`
		}
		if (
			confirm(`
        ${message}
        Do you want to play again?`)
		) {
			this.reset();
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
				this.stop();
				break;
			case this.key.num2:
				this.start();
				break;
		}
	}
};
