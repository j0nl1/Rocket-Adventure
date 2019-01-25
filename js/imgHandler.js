var images = {
    planets: {
    moon: {src: "img/planets/moon.svg", power: function(player) {reduceSpeed(player)}},
    mars: {src: "img/planets/mars.svg",power: function(player) {invertKeywords(player)}},
    jupiter: {src: "img/planets/jupiter.svg", power: function(player) {invulnerable(player)}},
    earth: {src: "img/planets/earth.svg", power: function() {cleanTrail()}}
    },
    rockets: {
    redRocket: {src: "img/rockets/red.svg", color: "#ff0000"},
    blueRocket: {src: "img/rockets/blue.svg", color: "#003db7"},
    whiteRocket: {src: "img/rockets/white.svg", color: "#ffffff"},
    yellowRocket: {src: "img/rockets/yellow.svg", color: "#fff600"}
    },
    backgrounds: {
        main: {src: "img/backgrounds/main.png"},
        winner: {src: "img/backgrounds/winner.svg"},
        starfield: {src: "img/backgrounds/starfield.png"}
    }
}

var allImages = {}

Object.keys(images).forEach((imgType) => {
    allImages[imgType] = {};
    Object.keys(images[imgType]).forEach((elem) => {
        let img = new Image()
        Object.keys(images[imgType][elem]).forEach((prop) => {
            img[prop] = images[imgType][elem][prop]
            img.onload = function () {
                
            }
        })
        allImages[imgType][elem] = img;
    })
    
})

// Gracias a Gaby por la sugerencia y ayudarme con el código!

/* Object.keys(images).forEach((e) => {
    var allImages = new Image()
    Object.keys(images[e]).forEach((prop) => {
    allImages[prop] = images[e][prop]
    allImages.onload = function () {
    }
    })
    imagesLoaded[e] = allImages;
}); */