const WIDTH = 1180;
const HEIGHT = 500;
const MARGIN = 30;

const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var xScale, yScale, group1, barSvg, lineSvg, numbers, line;

var getRandomNumbers = function (min, max, limit) {
    numbers = [];
    while (numbers.length <= limit) {
        var random_number = (_.random(1, 100));
        numbers.push(random_number);
    }
    return numbers;
};

var updateData = function(data){
    var updated_data = [];
    for(var i=0; i<data.length; i++){
        if(i==0)
            updated_data[data.length -1] = data[i];
        else
            updated_data[i-1] = data[i];
    }
    return updated_data;
};

var translate = function(x, y){
    return "translate("+x+","+y+")";
};

var generateAxis = function(svg){
    xScale = d3.scaleLinear()
        .domain([0,11])
        .range([0, WIDTH - (2 * MARGIN)]);

    yScale = d3.scaleLinear()
        .domain([0,100])
        .range([HEIGHT - (2 * MARGIN), 0]);

    var xAxis = d3.axisBottom(xScale).tickSizeInner(-HEIGHT);
    var yAxis = d3.axisLeft(yScale).tickSizeInner(-WIDTH);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .call(yAxis);

};

var generateLinePath = function () {
    numbers = getRandomNumbers(1,100,10);

    lineSvg = d3.select('.container1').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    generateAxis(lineSvg);

    group1 = lineSvg.append('g')
        .attr('transform', 'translate('+MARGIN+', '+MARGIN+')');

    line = d3.line()
        .x(function(d,i) {
            return xScale(i + 1);
        })
        .y(function(d) {
            return yScale(d);
        })
        .curve(d3.curveBundle.beta(0.5));

    group1.append("lineSvg:path");
};

var updateLineChart = function (numbers) {
    group1.selectAll("path").attr("d", line(numbers)).attr('class','line');

};

var updateChart = function(){
    numbers = updateData(numbers);
    updateLineChart(numbers);
    updateBarChart(numbers);
};


var createBarChart = function(){
   barSvg = d3.select(".container2").append("svg")
       .attr('width', WIDTH)
       .attr('height', HEIGHT);
    generateAxis(barSvg);
};

var updateBarChart = function(numbers){
    var rect = barSvg.selectAll("rect")
        .data(numbers)
        .enter()
        .append("rect")
        .attr('x', function (d, i) {
            return xScale(i+1);
        })
        .attr('y', function (d) {
            return yScale(d);
        });

    barSvg.selectAll("rect")
        .attr('x', function (d, i) {
            return xScale(i+1) + 20;
        })
        .attr('y', function (d) {
            return yScale(d) + 30;
        })
        .attr("height",function(d) {
            return INNER_HEIGHT - yScale(d);
        })
        .attr("width",15);

};

var generateChart = function(){
    generateLinePath();
    createBarChart();
    // setInterval(updateChart,500);
};

window.onload = generateChart;