var data = [
  {name: 'ramesh', subject: 'maths', score: 87},
  {name: 'suresh', subject: 'maths', score: 45},
  {name: 'pokemon', subject: 'english', score: 65},
  {name: 'mary', subject: 'kannada', score: 44},
  {name: 'riya', subject: 'science', score: 72},
  {name: 'katie', subject: 'social studies', score: 82},
  {name: 'katie', subject: 'maths', score: 98},
  {name: 'ramesh', subject: 'bengali', score: 25},
  {name: 'suresh', subject: 'science', score: 55},
  {name: 'riya', subject: 'tamil', score: 75},
  {name: 'pokemon', subject: 'sports', score: 95},
  {name: 'pokemon', subject: 'social studies', score: 32}
];

var generateScores = function (data) {
  var divs = d3.select('#barChart').selectAll('div').data(data, function (d) {
    return d.name + '_' + d.subject;
  });

  var subjects = ['maths', 'english', 'kannada', 'science', 'social studies', 'bengali', 'tamil', 'sports'];
  var colors = d3.schemeCategory10;

  divs.enter()
    .append('div')
    .classed('bar', true)
    .style('width', function (d) {
      return d.score * 10 + 'px'
    })
    .style('background', function (d) {
      return colors[subjects.indexOf(d.subject)];
    })
    .text(function (d) {
      return d.name + ' ' + d.score
    });

  divs.exit().remove();

  var legend = d3.select('#legend').selectAll('p').data(subjects);

  legend.enter()
    .append('p')
    .classed('subject', true)
    .style('background', function (d, i) {
      return colors[i];
    })
    .text(function (d) {
      return d;
    });

};


var sortBy = function (type) {
  d3.select('#barChart')
    .selectAll('div')
    .sort(function (a, b) {
      return d3.ascending(a[type], b[type]);
    });
};


var execute = function () {
  generateScores(data);
};


window.onload = execute;
