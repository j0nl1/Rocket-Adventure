function Rocket(game, id) {
    this.game = game
    this.name = name
    this.id = id
    this.color = undefined
    this.playScreen = game.playScreen
    this.img = undefined
    this.invulnerable = false
    this.ratio = 935/640
    this.rocketSize = 20
    this.x = this.playScreen.x + 100 + (Math.random() * (this.playScreen.width - 300))
    this.y = this.playScreen.y + 100 + (Math.random() * (this.playScreen.height - 200))
    this.width = 10
    this.height = 10
    this.acceleration = 4
    this.speed = 0
    this.angle = 0
    this.angularSpeed = 0
    this.trail = []
    this.chooseName()
    this.chooseRocket()
}

function degToRad(angle){
    return (angle*Math.PI)/180
}

Rocket.prototype.turnAngleSpeed = function(aS){
    if(this.angularSpeed < degToRad(5) && this.angularSpeed > -degToRad(5)){
        this.angularSpeed += degToRad(aS)
    }
}

Rocket.prototype.draw = function () {
    this.game.ctx.save()
    this.game.ctx.translate(this.x, this.y)
    this.game.ctx.rotate(this.angle)
    this.game.ctx.drawImage(this.img,
        -this.rocketSize*this.ratio/2,
        -this.rocketSize/2, 
        this.rocketSize*this.ratio,this.rocketSize)
        this.game.ctx.restore()
}

Rocket.prototype.move = function () {
    this.angle += this.angularSpeed
    this.speed += this.acceleration
    this.speed *= 0.40;
    this.x += this.speed * Math.cos(this.angle)
    this.y += this.speed * Math.sin(this.angle)
}

Rocket.prototype.savePosition = function () {
    if(this.invulnerable == false) {
    this.trail.push({posX:this.x, posY:this.y})
    }
}

Rocket.prototype.drawTrack = function () {
    this.trail.forEach((subArray) => {
        this.game.ctx.fillStyle = this.color
        this.game.ctx.fillRect(subArray.posX, subArray.posY, 5, 5)
    })
}

Rocket.prototype.deleteTrack = function () {
    if(this.trail.length > 500){
        for (let i = 0; i < 2; i++){
            this.trail.shift()
        }
    }
}

Rocket.prototype.restartPositionAndTrail = function () {
        this.trail = []
		this.x = this.playScreen.x + 100 + (Math.random() * (this.playScreen.width - 300))
		this.y = this.playScreen.y + 100 + (Math.random() * (this.playScreen.height - 200))
}

Rocket.prototype.chooseName = function () {
    let input = prompt(`Player ${this.id} Name`)
    this.name = input
}

Rocket.prototype.chooseRocket = function () {
    let input = prompt(`
    What color do you want?
    Red, Blue, White or Yellow`).toLowerCase()

    switch(input) {
        case "red":
        this.img = allImages.rockets.redRocket;
        this.color = this.img.color
        break;
        case "blue":
        this.img = allImages.rockets.blueRocket;
        this.color = this.img.color
        break;
        case "white":
        this.img = allImages.rockets.whiteRocket;
        this.color = this.img.color
        break;
        case "yellow":
        this.img = allImages.rockets.yellowRocket;
        this.color = this.img.color
        break;
    }
}

Rocket.prototype.constructor = Rocket
