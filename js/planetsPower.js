function invertKeywords(player) { // Mars
    if(player.id == 1) {
        this.game.key.A = 68
        this.game.key.D = 65
        setTimeout(function() {
            this.game.key.A = 65
            this.game.key.D = 68
        },3000)
    }
    if(player.id == 2) {
        this.game.key.leftArrow = 39
        this.game.key.rightArrow = 37
        setTimeout(function() {
        this.game.key.leftArrow = 37
        this.game.key.rightArrow = 39
        },3000)
    }
    
}

function invulnerable(player) {  // Jupiter
    player.invulnerable = true 
    setTimeout(function() {
        player.invulnerable = false
    }, 5000)
}

function reduceSpeed(player) { // Moon
    if (player.id == 1) {
        this.game.playerTwo.acceleration = 2
        setTimeout(function() {
        this.game.playerTwo.acceleration = 4
            }, 5000)
    }
    if (player.id == 2) {
        this.game.playerOne.acceleration = 2
        setTimeout(function() {
        this.game.playerOne.acceleration = 4
            }, 5000)
    }
}

function cleanTrail() {  // Earth
    this.game.playerOne.trail = []
    this.game.playerTwo.trail = []
}