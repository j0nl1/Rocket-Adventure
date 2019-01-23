var images = {
    moon: {src: "img/planets/moon.svg", power: function(player) {this.reduceSpeed(player)}},
    mars: {src: "img/planets/mars.svg",power: function(player) {this.invertKeywords(player)}},
    jupiter: {src: "img/planets/jupiter.svg", power: function() {this.ignoreFrames()}},
    earth: {src: "img/planets/earth.svg", power: function() {this.cleanTrail()}},
    redRocket: {src: "img/rockets/red.svg", color: "#ff0000"},
    blueRocket: {src: "img/rockets/blue.svg", color: "#003db7"},
    whiteRocket: {src: "img/rockets/white.svg", color: "#ffffff"},
    yellowRocket: {src: "img/rockets/yellow.svg", color: "fff600"}
}

var imagesLoaded = {}

Object.keys(images).forEach((e) => {
    var allImages = new Image()
    Object.keys(images[e]).forEach((prop) => {
    allImages[prop] = images[e][prop]
    imagesLoaded[e] = allImages;
    allImages.onload = function () {
    }
    })
});