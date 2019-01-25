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
		SPACE: 32
	},
	pause: false,
	counter: 3,
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
			this._setCanvasDimensions()
			this.playScreen = new PlayScreen(this)
			this.initBackground()
			this.drawAll()
		};
	},
	_keysListener: function () {
		document.onkeydown = e => this.handleKeyDown(e.keyCode)
		document.onkeyup = e => this.handleKeyUp(e.keyCode)
	},
	_mouseListener: function() {
		
	},
	init: function () {
		this.canvas = document.querySelector("#spaceGame")
		this.ctx = this.canvas.getContext("2d")
		this.fps = 60
		this._setCanvasDimensions()
		this._setHandlers()
		this._keysListener()

		this.reset()
		this.initBackground()
		this.drawAll()
		this.countBack()
	},
	start: function () {
		this.interval = setInterval(() => {
			this.framesCounter++;

			if (this.framesCounter % 2 === 0) {
				this.playerOne.deleteTrack();
				this.playerTwo.deleteTrack();
			}
			if (this.framesCounter % 300 === 0) {
				this.generatePlanet()
			}
			if (this.framesCounter > 1400) {
				this.framesCounter = 0;
			}
			collisions(this);
			this.moveAll();
			this.drawAll();
			this.trackAll();
		}, 1000 / this.fps);
	},
	restartGame: function() {
		this.playerOne.restartPositionAndTrail()
		this.playerTwo.restartPositionAndTrail()
		this.planets = []
		this.drawAll()
		this.framesCounter = 0
		this.counter = 3
		this.userExperience = new UserExperience (this)
		this.countBack()
	},
	pauseResume: function () {
		if (this.pause) {
			this.counter = 3
			this.countBack()
			return this.pause = !this.pause
		}
		this.stop()
		return this.pause = !this.pause
	},
	stop: function () {
		clearInterval(this.interval);
	},
	initBackground: function () {
		this.ctx.drawImage(allImages.backgrounds.main, 0, 0, this.w, this.h)
	},
	countBack: function () {
		setTimeout(() =>{
			this.drawAll();
			this.ctx.font = "100px Arial"
			this.ctx.fillStyle = "#fff"
			this.ctx.fillText(this.counter, this.w / 2 - 30, this.h / 2 - 30)
			this.counter--
			if(this.counter > -1)
				{this.countBack()}
			if(this.counter === -1) {
				this.start()
			}
		}, 1000);
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
		this.playerOne = new Rocket(this, 1)
		this.playerTwo = new Rocket(this, 2)
		this.userExperience = new UserExperience (this)
		this.framesCounter = 0
		this.counter = 3
		this.planets = []
	},
	generatePlanet: function () {
		 this.planets.push(new Planet(this, allImages.planets[Object.keys(allImages.planets)[Math.floor(Math.random()*Object.keys(allImages.planets).length)]]))
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
			case this.key.SPACE:
				this.pauseResume();
				break;
		}
	}
};
