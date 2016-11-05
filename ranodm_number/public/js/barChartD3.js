
var randomBlue = function () {
    return "rgb("+Math.floor(Math.random() * 100)+", "+ Math.floor(Math.random() * 255)+", 255)";
};

var id = 0;

var drawBars = function (data) {
    debugger;
  var bar = d3.select("#container").selectAll("div")
      .data(data, function (d) {
          return d.id;
      })
      .enter()
      .append("div")
      .classed("bar", true)
      .style("width", function (d) {
          return d.number + "px";
      })
      .style("background",function(){
          return randomBlue();
      })
      .text(function (d) {
          return d.number;
      });
var oldBar = bar;
    bar.data(data, function (d) {
       return d.id;
    }).style("width",function (d) {
        return d.number +'px';
        })
        .text(function (d) {
            return d;
        });
    var newBar = bar;
    bar.exit().remove();
};

var updateBar = function (data) {
    d3.selectAll(".bar").data(data, function () {
        return id++;
    })
        .style("width",function (d) {
            return d.number +'px';
        })
        .text(function (d) {
            return d.number;
        });
        // .style("background", function () {
        //     return randomBlue();
        // })
};

var get_random_numbers = function(){
    var numbers =[];
    for(var i = 0; i< 10;i++){
        numbers.push({"number":Math.floor(Math.random() * 800) + 200, "id": id++});
    }
    return numbers;
};

var createBarChart = function(){
    var numbers = get_random_numbers();
    drawBars(numbers);
    setInterval(function () {
        var value = Math.floor(Math.random() * 800) + 200;
        numbers.shift();
        numbers.push(value);
        drawBars(numbers);
        // updateBar(numbers);
    },900)
};

window.onload = createBarChart;

