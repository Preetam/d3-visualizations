var data = [0, 1, 2, 4, 8, 16, 32],
  w = 500,
  h = 350,
  margin = 50,
  title = "First D3.js Chart!",
  y = d3.scaleLinear().domain([0, d3.max(data)]).range([h - margin, 0 + margin]),
  x = d3.scaleLinear().domain([0, data.length]).range([0 + margin, w - margin]);

var chart = d3.select("#chart").
append("svg:svg").
attr("width", w).
attr("height", h).
attr("style", "background-color: white;");

var line = d3.line()
  .x(function(d, i) {
    return x(i);
  })
  .y(function(d) {
    return y(d);
  });

var xAxis = d3.axisBottom(x).ticks(4);
var yAxis = d3.axisLeft(y).ticks(3);

var lineGroup = chart.append("svg:g");

lineGroup.append("svg:path").
attr("d", line(data)).
attr("fill", "none").
attr("stroke", "#000000").
attr("stroke-width", "2px");

lineGroup.append("svg:g").
attr("transform", "translate(0, " + (h - margin + 10) + ")").
attr("class", "axis").
call(xAxis);

lineGroup.append("svg:g").
attr("transform", "translate(" + (margin - 10) + ", 0)").
attr("class", "axis").
call(yAxis);

chart.append("svg:text").
attr("transform", "translate(" + w / 2 + "," + 25 + ")").
style("text-anchor", "middle").
text(title).
attr("font-family", "sans-serif");

d3.selectAll(".axis").selectAll("text").attr("fill", "#888");
d3.selectAll(".axis").selectAll("line").attr("stroke", "#888");
d3.selectAll(".axis").selectAll(".domain").attr("stroke", "#888");
