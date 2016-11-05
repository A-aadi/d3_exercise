var drawBar = function(data, container){
    data.map(function (d) {
        container.appendChild(createDiv(d));
    });
};

var get_random_numbers = function(){
    var numbers =[];
    for(var i = 0; i< 10;i++){
        numbers.push(Math.floor(Math.random() * 800) + 200);
    }
    return numbers;
};

var randomBlue = function () {
    return "rgb("+Math.floor(Math.random() * 100)+", "+ Math.floor(Math.random() * 255)+", 255)";
};

var createDiv = function(num){
    var div = document.createElement("div");
    div.style.width = num + "px";
    div.className = "bar";
    div.textContent = num;
    div.style.background = randomBlue();
    return div;
};

var updateBar = function (value, container) {
    container.removeChild(container.firstChild);
    container.appendChild(createDiv(value));
};

var createBarChart = function(){
    var numbers = get_random_numbers();
    var container = document.getElementById("container");
    drawBar(numbers, container);
    // setInterval(function () {
    //     var value = Math.floor(Math.random() * 800) + 200;
    //     updateBar(value, container);
    // },900)
};

window.onload = createBarChart;