var images = {
    mars: {src: "img/planets/mars.svg",power: () => invertKeywords()},
    jupiter: {src: "img/planets/jupiter.svg", power: () => ignoreFrames()},
    moon: {src: "img/planets/moon.svg", power: () => incrementSpeed()},
    earth: {src: "img/planets/earth.svg", power: () => cleanTrail()},
    redRocket: {src: "img/rockets/red.svg", color: "#ff0000"},
    blueRocket: {src: "img/rockets/blue.svg", color: "#003db7"}
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