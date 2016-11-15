var createShapes = function () {
    var svg = d3.select("#container")
        .append("svg")
        .attr("width", 900)
        .attr("height", 400);

    var line = svg.append("line")
        .attr("x1", 45)
        .attr("y1", 195)
        .attr("x2", 95)
        .attr("y2", 95)
        .attr("stroke-width",2)
        .attr("stroke", "grey");

    var circle = svg.append("circle")
        .attr("cx",195)
        .attr("cy",145)
        .attr("r", 50)
        .style("fill", "none")
        .attr("stroke-width",2)
        .attr("stroke","red");


    var rectangle = svg.append("rect")
        .attr("x", 295)
        .attr("y", 95)
        .attr("width", 100)
        .attr("height",100)
        .style("fill", "none")
        .attr("stroke-width",2)
        .attr("stroke","steelblue");


    var triangle = svg.append("polygon")
        .classed("shape", true)
        .style("stroke", "green")
        .style("fill", "none")
        .attr("points", "445,195, 495, 95, 545, 195");
};


window.onload = createShapes;