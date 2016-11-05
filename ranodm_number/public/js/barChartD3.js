const LIMIT = 1000;
var lastSequenceProvided = 0;

var getBlueColor = function (d) {
    return "rgb("+(d * 100)%50+", " + ((d * 100)%255) + ", 255)";
};

var getSequence = function () {
    return lastSequenceProvided++;
};



var randomNumbers = function () {
    var numbers = [];
    for (var i = 0; i < 10; i++) {
        numbers.push(Math.round(Math.random() * LIMIT));
    }
    return numbers;
};

var generateBars = function (data) {
    var divs = d3.select('#container').selectAll('div').data(data, function () {
        return getSequence();
    });

    divs.enter()
        .append('div')
        .classed('bar', true)
        .style('width', function (d) {
            return d + 'px'
        })
        .style('background', function (d) {
            return getBlueColor(d);
        })
        .text(function (d) {return d});

    divs.exit().remove();
};


var execute = function () {
    var data = randomNumbers();
    setInterval(function () {
        var value = Math.round(Math.random() * LIMIT);
        generateBars(data);
        data.shift();
        data.push(value);
    }, 200);
};


window.onload = execute;