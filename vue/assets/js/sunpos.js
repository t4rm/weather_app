// Données d'entrée
let sunrise = 6; // Heure du lever du soleil
let sunset = 18; // Heure du coucher du soleil
let currentTime = 15; // Heure actuelle

// Calculer la position du soleil
let sunPosition = (currentTime - sunrise) / (sunset - sunrise);

// Créer le SVG
let container = d3.select(".sunpath")
let svg = container.append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 200 100") // Ajout de viewBox pour rendre le SVG responsive

// Créer la courbe
let pathData = "M4,100 Q100,10 196,100";

let path = svg.append("path")
    .attr("d", pathData)
    .attr("stroke", "transparent")
    .attr("fill", "transparent");

// Créer la partie de la courbe déjà parcourue par le soleil
let pathCovered = svg.append("path")
    .attr("d", pathData)
    .attr("stroke", "orange")
    .attr("fill", "transparent")
    .attr("stroke-dasharray", function () {
        let pathLength = this.getTotalLength();
        return (sunPosition * pathLength) + " " + pathLength;
    });

// Créer la partie de la courbe restante
let pathRemaining = svg.append("path")
    .attr("d", pathData)
    .attr("stroke", "orange")
    .attr("fill", "transparent")
    .attr("stroke-dasharray", "5,5")
    .attr("stroke-dashoffset", function () {
        return this.getTotalLength() * sunPosition;
    });

// Créer le soleil
let sun = svg.append("image")
    .attr("href", "../vue/assets/images/weather/clear-day.svg")
    .attr("width", 60)
    .attr("height", 60);

let startCircle = svg.append("circle")
    .attr("r", 5)
    .attr("fill", "orange");

let endCircle = svg.append("circle")
    .attr("r", 5)
    .attr("fill", "orange");

// Mettre à jour la position du soleil et de son fond
let pathLength = path.node().getTotalLength();
sun.attr("transform", function () {
    let point = path.node().getPointAtLength(sunPosition * pathLength);
    return "translate(" + (point.x - 30) + "," + (point.y - 30) + ")";
});

[startCircle, endCircle].forEach(function (element, index) {
    element.attr("transform", function () {
        let point = path.node().getPointAtLength(index * pathLength);
        return "translate(" + point.x + "," + point.y + ")";
    });
});

// Ajouter une ligne allant de startCircle à endCircle
let line = svg.append("line")
    .attr("x1", 0)
    .attr("y1", function () {
        let point = path.node().getPointAtLength(0);
        return point.y;
    })
    .attr("x2", 200) // Utiliser la largeur de viewBox
    .attr("y2", function () {
        let point = path.node().getPointAtLength(pathLength);
        return point.y;
    })
    .attr("stroke", "black");
