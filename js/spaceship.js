function Rocket(game, playScreen) {
    this.game = game
    this.playScreen = playScreen
    this.img = new Image()
    this.img.src = "img/rocket.svg"
    this.ratio = 807/640
    this.rocketSize = 30
    // this.x = this.playScreen.x + Math.floor((Math.random() * this.playScreen.width) - (this.playScreen.width * 0.1))
    // this.y = this.playScreen.y + Math.floor((Math.random() * this.playScreen.height) - (this.playScreen.height * 0.1))
    this.x = Math.floor(Math.random() * ((this.playScreen.x + this.playScreen.width) - this.playScreen.x + 1)) + this.playScreen.x;
    this.y = Math.floor(Math.random() * ((this.playScreen.y + this.playScreen.height) - this.playScreen.y + 1)) + this.playScreen.y;
    this.width = 30
    this.height = 30
    this.acceleration = 1
    this.speed = 0
    this.angle = Math.PI
    this.angularSpeed = 0
}

function degToRad(angle){
    return (angle*2*Math.PI)/360
}

Rocket.prototype.turnAngleSpeed = function(aS){
    if(this.angularSpeed < degToRad(10) && this.angularSpeed > -degToRad(10)){
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
    /* console.log("esto es x: " + this.x)
    console.log("esto es y: " + this.y) */
}

Rocket.prototype.move = function () {
    this.angle += this.angularSpeed
    this.speed += this.acceleration
    this.speed *= 0.40;
    this.x += this.speed * Math.cos(this.angle)
    this.y += this.speed * Math.sin(this.angle)
}