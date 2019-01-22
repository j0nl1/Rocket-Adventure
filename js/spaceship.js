function Rocket(game, playScreen, tracker) {
    this.game = game
    this.playScreen = playScreen
    this.img = new Image()
    this.img.src = "img/rocket.svg"
    this.ratio = 807/549
    this.rocketSize = 20
    // this.x = this.playScreen.x + Math.floor((Math.random() * this.playScreen.width) - (this.playScreen.width * 0.1))
    // this.y = this.playScreen.y + Math.floor((Math.random() * this.playScreen.height) - (this.playScreen.height * 0.1))
    this.x = Math.floor(Math.random() * ((this.playScreen.x + this.playScreen.width) - this.playScreen.x + 1)) + this.playScreen.x;
    this.y = Math.floor(Math.random() * ((this.playScreen.y + this.playScreen.height) - this.playScreen.y + 1)) + this.playScreen.y;
    this.width = 30
    this.height = 30
    this.acceleration = 1
    this.speed = 0
    this.angle = 0
    this.angularSpeed = 0
    this.tempTrail = []
    this.trail = []
}

function degToRad(angle){
    return (angle*Math.PI)/180
}

Rocket.prototype.turnAngleSpeed = function(aS){
    if(this.angularSpeed < degToRad(1) && this.angularSpeed > -degToRad(1)){
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

Rocket.prototype.push = function () {
    this.trail.push(this.tempTrail)
    this.tempTrail = []
}

Rocket.prototype.savePosition = function () {
    this.tempTrail.push({posX:this.x-10, posY:this.y-10})
}

Rocket.prototype.drawTrack = function (color) {
    this.trail.forEach((subArray) => subArray.forEach((pos) => {
        this.game.ctx.fillStyle = color
        this.game.ctx.fillRect(pos.posX+10, pos.posY+10, 5, 5)
    }))
}

Rocket.prototype.deleteTrack = function (quantity) {
    if(this.trail.length > quantity) {
    for(let i = 0; i < 1; i++) {
        if(this.trail[i].length == 0) {
            this.trail.splice(i, 1)
            i--
        }
        if(i < 0 ) {
            i = 0
        }
        for(let j=0; j < this.trail[i].length; j++){
        this.trail[i].splice(j, 1)
        j--
        }
    }
}
}

Rocket.prototype.constructor = Rocket