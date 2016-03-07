function drawLineChart() {

d3.json("jsonOutput/csvDataContinent.json", function(error, data) {
    console.log(data);

var dataGroup = d3.nest()
    .key(function(d) {return d.continent;})
    .entries(data);


// console.log(JSON.stringify(dataGroup));
var color = d3.scale.category10();
var vis = d3.select("#visualisation"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
        top: 50,
        right: 100,
        bottom: 50,
        left: 80
    },
    lSpace = WIDTH/dataGroup.length;
    xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(data, function(d) {
        return d.year;
    }), d3.max(data, function(d) {
        return d.year;
    })]),
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(data, function(d) {
        return d.value;
    }), d3.max(data, function(d) {
        return d.value;
    })]),
    xAxis = d3.svg.axis()
    .scale(xScale),
    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

var color_arr = [];
vis.append("svg:g")
    .attr("class", "x axis1")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);
vis.append("svg:g")
    .attr("class", "y axis1")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

var lineGen = d3.svg.line()
    .x(function(d) {
        return xScale(d.year);
    })
    .y(function(d) {
        return yScale(d.value);
    })
    .interpolate("basis");
dataGroup.forEach(function(d,i) {
    vis.append('svg:path')
    .attr('d', lineGen(d.values))
    .attr('stroke', function(d,j) {
            var temp_color = "hsl(" + Math.random() * 360 + ",100%,50%)";
            // var temp_color = c10;
            color_arr.push(temp_color);
            return temp_color;
    })
    .attr('stroke-width', 2)
    .attr('id', 'line_'+d.key)
    .attr('fill', 'none');


    vis.append("text")
        .attr("x", (lSpace/2)+i*lSpace)
        .attr("y", HEIGHT)
        .style("fill", "black")
        .attr("class","legend1")
        .on('click',function(){
            var active   = d.active ? false : true;
            var opacity = active ? 0 : 1;
            d3.select("#line_" + d.key).style("opacity", opacity);
            d.active = active;
        })
        .text(d.key);
    });

    // add legend
var legend = vis.append("g")
  .attr("class", "legend1")
    //.attr("x", w - 65)
    //.attr("y", 50)
  .attr("height", 100)
  .attr("width", 100)
.attr('transform', 'translate(-20,90)')


legend.selectAll('rect')
  .data(dataGroup)
  .enter()
  .append("rect")
  .attr("x", WIDTH - 65)
  .attr("y", function(d, i){ return i *  20;})
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", function(d,i) {
    var color = color_arr[i];
    return color;
  })

legend.selectAll('text')
  .data(dataGroup)
  .enter()
  .append("text")
  .attr("x", WIDTH - 52)
  .attr("y", function(d, i){ return i *  20 + 9;})
  .text(function(d) {
      console.log(d.key);
    var text = d.key;
    return text;
  });


});

}
