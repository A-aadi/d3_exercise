const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;


var createChart = function () {

    var d = [{"curveLinear":d3.curveLinear,"curveTitle":"curveLinear"},
        {"curveStep":d3.curveStep,"curveTitle":"curveStep"},
        {"curveStepBefore":d3.curveStepBefore,"curveTitle":"curveStepBefore"},
        {"curveStepAfter":d3.curveStepAfter,"curveTitle":"curveStepAfter"},
        {"curveBasis":d3.curveBasis,"curveTitle":"curveBasis"},
        {"curveCardinal":d3.curveCardinal,"curveTitle":"curveCardinal"},
        {"curveMonotoneX":d3.curveMonotoneX,"curveTitle":"curveMonotoneX"},
        {"curveCatmullRom":d3.curveCatmullRom,"curveTitle":"curveCatmullRom"}];

    createLineGraph();
    createButtons(d);
};

var createLineGraph = function (interpolate) {
    if (!document.getElementById("container").innerHTML == "" || null){
        d3.select("svg").remove();
    }

    var interpolateObj = {"curveLinear":d3.curveLinear, "curveStep":d3.curveStep, "curveStepBefore":d3.curveStepBefore, "curveStepAfter":d3.curveStepAfter,
        "curveBasis":d3.curveBasis, "curveCardinal":d3.curveCardinal, "curveMonotoneX":d3.curveMonotoneX, "curveCatmullRom":d3.curveCatmullRom};

    if(!interpolate){
        interpolate = "curveLinear";
    }

    document.getElementById("graphInterpolate").innerHTML = interpolate;

    var data = [
        {x: 0, y: 5},
        {x: 1, y: 9},
        {x: 2, y: 7},
        {x: 3, y: 5},
        {x: 4, y: 3},
        {x:5, y:3.5},
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
    var yScale = d3.scaleLinear().domain([1, 0]).range([0,INNER_HEIGHT]);

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

    var line = d3.line()
        .x(function (d) {return xScale(d.x/10) ; })
        .y(function (d) {return yScale(d.y/10) ; })
        .curve(interpolateObj[interpolate]);

    g.append('path')
        .attr('d', line(data))
        .attr("stroke","red")
        .attr("fill", "none");

    var sinLine = d3.line()
        .x(function (d) {return xScale(d.x/10) ; })
        .y(function (d) {return yScale((Math.sin(d.x))/10 + 0.5)})
        .curve(interpolateObj[interpolate]);


    g.append('path')
        .attr('d', sinLine(data))
        .attr("stroke","blue")
        .attr("fill", "none");

    g.selectAll('circle').data(data)
        .enter()
        .append('circle')
        .attr('r', 4)
        .attr("cx", function (d) {
            return xScale(d.x/10);
        })
        .attr("cy", function (d) {
            return yScale(d.y/10);
        })
        .attr("fill", "white")
        .attr("stroke", "blue");

    g.selectAll('circleForSin').data(data)
        .enter()
        .append('circle')
        .attr('r', 4)
        .attr("cx", function (d) {
            return xScale(d.x/10);
        })
        .attr("cy", function (d) {
            return yScale((Math.sin(d.x))/10 + 0.5);
        })
        .attr("fill", "white")
        .attr("stroke", "steelblue");

};

var translate = function(x, y){
    return "translate("+x+","+y+")";
};

var handleOnclickEvents = function () {
    createLineGraph(this.innerHTML)
};

var createButtons = function (d) {
    var container = document.getElementById("button_container");
    for(var i=0; i<d.length; i++){
        var button = document.createElement("BUTTON");
        button.textContent = d[i].curveTitle;
        button.style.margin = '15px';
        button.className = "curveButton";
        button.onclick = handleOnclickEvents;
        container.appendChild(button)
    }
};

window.onload = createChart ;
