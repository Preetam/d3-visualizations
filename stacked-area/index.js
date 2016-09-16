var data = [
	{'metric1': 0, 'metric2': 2, 'metric3': 12},
	{'metric1': 1, 'metric2': 4, 'metric3': 8},
	{'metric1': 2, 'metric2': 6, 'metric3': 6},
	{'metric1': 4, 'metric2': 8, 'metric3': 4},
	{'metric1': 6, 'metric2': 12, 'metric3': 2},
];


var
  w = 500,
  h = 350,
  margin = 50,
  keys = ['metric1', 'metric2', 'metric3'],
  y = d3.scaleLinear().domain([0, 20]).range([h - margin, 0 + margin]),
  x = d3.scaleLinear().domain([0, 4]).range([0 + margin, w - margin]),
  z = d3.scaleOrdinal(d3.schemeCategory10).domain(keys);

var chart = d3.select("#chart").
append("svg:svg").
attr("width", w).
attr("height", h).
attr("style", "background-color: white;");

var line = d3.area()
  .x(function(d, i) {
    return x(i);
  })
  .y0(function(d) {
	console.log(d);
    return y(d[1]);
  })
  .y1(function(d) {
	  return y(d[0]);
  });

var stack = d3.stack().keys(keys);

var xAxis = d3.axisBottom(x).ticks(4);
var yAxis = d3.axisLeft(y).ticks(3);

var lineGroup = chart.append("svg:g");

var layer = lineGroup.selectAll('.layer')
	.data(stack(data))
	.enter().append("g")
		.attr("class", "layer");

layer.append('svg:path')
	.attr('d', line)
	.attr('fill', function(d) { return z(d.key); })
	.attr('stroke', '#222')
