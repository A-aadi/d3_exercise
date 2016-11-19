const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;


var createChart = function () {

    var interpolations = [
        d3.curveLinearClosed,
        d3.curveStep,
        d3.curveBasis,
        d3.curveCardinalClosed,
        d3.curveCatmullRomOpen
    ];
    for(var i=0; i<interpolations.length; i++){
        createAreaGraph(interpolations[i]);
    }

}  ;

var createAreaGraph = function (interpolation) {

    var data = [
        {x: 0, y: 5},
        {x: 1, y: 9},
        {x: 2, y: 7},
        {x: 3, y: 5},
        {x: 4, y: 3},
        {x: 5, y: 3.5},
        {x: 6, y: 4},
        {x: 7, y: 2},
        {x: 8, y: 3},
        {x: 9, y: 2}
    ];

    var svg = d3.select("#container")
        .append("svg")
        .attr("width",WIDTH)
        .attr("height", HEIGHT);

    var xScale = d3.scaleLinear().domain([0, 1]).range([0,INNER_WIDTH]);
    var yScale = d3.scaleLinear().domain([1, 0]).range([0, INNER_HEIGHT]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .call(xAxis)
        .attr("transform", translate(MARGIN,INNER_HEIGHT + MARGIN));

    svg.append("g")
        .call(yAxis)
        .attr("transform", translate(MARGIN, MARGIN));

    var g = svg.append('g')
        .attr('transform',  translate(MARGIN, MARGIN));


    var sinLine = d3.line()
        .x(function (d) {return xScale(d.x/10) ; })
        .y(function (d) {return yScale((3*(Math.sin(d.x))+5)/10)})
        .curve(interpolation);

    var area = d3.area()
        .x(function (d) {return xScale(d.x/10) ; })
        .y1(function (d) {return yScale((3*(Math.sin(d.x))+5)/10)})
        .y0(INNER_HEIGHT)
        .curve(interpolation);


    g.append('path')
        .attr('d', sinLine(data))
        .attr("stroke","blue")
        .attr("fill", "none");

    g.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area)
        .style("fill", "LightBlue");


    g.selectAll('circleForSin').data(data)
        .enter()
        .append('circle')
        .attr('r', 4)
        .attr("cx", function (d) {
            return xScale(d.x/10);
        })
        .attr("cy", function (d) {
            return yScale((3*(Math.sin(d.x))+5)/10);
        })
        .attr("fill", "white")
        .attr("stroke", "steelblue");

};

var translate = function(x, y){
    return "translate("+x+","+y+")";
};


window.onload = createChart ;
