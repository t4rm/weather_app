// Données d'entrée
sunrise = parseInt(sunrise); // Heure du lever du soleil
sunset = parseInt(sunset); // Heure du coucher du soleil
moonrise = parseInt(moonrise); // Heure du lever du soleil
moonset = parseInt(moonset); // Heure du coucher du soleil
currentTime = parseInt(currentTime); // Heure actuelle
let color = "orange";
let sunPosition = (currentTime - sunrise) / (sunset - sunrise);
let day = "day";

if(currentTime < sunrise || currentTime > sunset) {
    sunPosition = (moonset - moonrise) / (currentTime - moonrise) 
    console.log(moonrise, moonset, currentTime)
    color = "grey"
    day = "night";
}

// Créer le SVG
let container = d3.select(".sunpath")
let svg = container.append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "-5 -55 170 60")

// Créer la courbe
let pathData = "m 0 0 q 74 -87 159 0";

let path = svg.append("path")
    .attr("d", pathData)
    .attr("stroke", "transparent")
    .attr("fill", "transparent");

// Créer la partie de la courbe déjà parcourue par le soleil
let pathCovered = svg.append("path")
    .attr("d", pathData)
    .attr("stroke", color)
    .attr("fill", "transparent")
    .attr("stroke-dasharray", function () {
        let pathLength = this.getTotalLength();
        return (sunPosition * pathLength) + " " + pathLength;
    });

// Créer la partie de la courbe restante
let pathRemaining = svg.append("path")
    .attr("d", pathData)
    .attr("stroke", color)
    .attr("fill", "transparent")
    .attr("stroke-dasharray", "5,5")
    .attr("stroke-dashoffset", function () {
        return this.getTotalLength() * sunPosition;
    });

// Créer le soleil
let sun = svg.append("image")
    .attr("href", "../vue/assets/images/weather/clear-"+day+".svg")
    .attr("width", 30)
    .attr("height", 30);

let startCircle = svg.append("circle")
    .attr("r", 2)
    .attr("fill", color);

let endCircle = svg.append("circle")
    .attr("r", 2)
    .attr("fill", color);

// Mettre à jour la position du soleil et de son fond
let pathLength = path.node().getTotalLength();
sun.attr("transform", function () {
    let point = path.node().getPointAtLength(sunPosition * pathLength);
    return "translate(" + (point.x - 15) + "," + (point.y - 15) + ")";
});

[startCircle, endCircle].forEach(function (element, index) {
    element.attr("transform", function () {
        let point = path.node().getPointAtLength(index * pathLength);
        return "translate(" + point.x + "," + point.y + ")";
    });
});


