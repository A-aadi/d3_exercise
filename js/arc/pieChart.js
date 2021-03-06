var dataSet = [1, 1, 2, 2, 1, 2, 1];

const RADIUS = 250;
const WIDTH = 600;
const HEIGHT = 600;
var color = ["#1F77B4","#AE87E8","#AEC7E8","#FFBB78","#2CA02C","#98DF8A","#D62728"];
var arc = d3.arc()
    .innerRadius(145)
    .outerRadius(RADIUS);


var svg = d3.select('#container')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .append('g')
    .attr('transform', 'translate(' + (WIDTH / 2) + ',' + (HEIGHT / 2) + ')');

var pie = d3.pie()
    .value(function(d) { return d})
    .sort(null);

var path = svg.selectAll('path')
    .data(pie(dataSet))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d,i){
        return color[i];
    });