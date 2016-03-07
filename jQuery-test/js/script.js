function drawBarChart(jsonFile,title,tab,mTop){
    var margin ={top:mTop, right:30, bottom:70, left:20},
        width=1040-margin.left - margin.right ,
        height=550-margin.top-margin.bottom ;

    // scale to ordinal because x axis is not numerical
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

    //scale to numerical value by height
    var y = d3.scale.linear().range([height, 0]);

    var chart = d3.select(tab)
                  .append("svg")  //append svg element inside #chart
                  .attr("width", width+(2*margin.left)+margin.right)    //set width
                  .attr("height", height+margin.top+margin.bottom);  //set height

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>" + title + "</strong> <span style='color:red'>" + d.y + "</span>";
        })

    chart.call(tip);

    var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom");  //orient bottom because x-axis will appear below the bars

    var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left");

    d3.json(jsonFile, function(error, data){
      x.domain(data.map(function(d){ return d.x}));
      y.domain([0, d3.max(data, function(d){return d.y})]);

      var bar = chart.selectAll("g")
                        .data(data)
                      .enter()
                        .append("g")
                        .attr("transform", function(d, i){
                          return "translate("+x(d.x)+", 0)";
                        });


      bar.append("rect")
          .attr("y", function(d) {
            return y(d.y);
          })
          .attr("x", function(d,i){
            return x.rangeBand()+(margin.left/4);
          })
          .attr("height", function(d) {
            return height - y(d.y);
          })
          .attr("width", x.rangeBand())  //set width base on range on ordinal data
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

      chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate("+margin.left+","+ height+")")
            .call(xAxis)
            .selectAll("text")
               .style("text-anchor", "end")
               .attr("dx", "-.8em")
               .attr("dy", ".15em")
               .attr("transform", "rotate(-65)" );

      chart.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate("+margin.left+",0)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(title);
    });

    function type(d) {
        d.x = +d.x; // coerce to number
        return d;
      }
}

function drawBarChart1(jsonFile,title,tab,mTop){
    var margin ={top:mTop, right:30, bottom:70, left:20},
        width=1040-margin.left - margin.right ,
        height=550-margin.top-margin.bottom ;

    // scale to ordinal because x axis is not numerical
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

    //scale to numerical value by height
    var y = d3.scale.linear().range([height, 0]);

    var chart = d3.select(tab)
                  .append("svg")  //append svg element inside #chart
                  .attr("width", width+(2*margin.left)+margin.right)    //set width
                  .attr("height", height+margin.top+margin.bottom);  //set height

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>" + title + "</strong> <span style='color:red'>" + d.y + "</span>";
        })

    chart.call(tip);

    var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom");  //orient bottom because x-axis will appear below the bars

    var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left");

    // d3.json(jsonFile, function(error, data){
     data = jsonFile;
      x.domain(data.map(function(d){ return d.x}));
      y.domain([0, d3.max(data, function(d){return d.y})]);

      var bar = chart.selectAll("g")
                        .data(data)
                      .enter()
                        .append("g")
                        .attr("transform", function(d, i){
                          return "translate("+x(d.x)+", 0)";
                        });


      bar.append("rect")
          .attr("y", function(d) {
            return y(d.y);
          })
          .attr("x", function(d,i){
            return x.rangeBand()+(margin.left/4);
          })
          .attr("height", function(d) {
            return height - y(d.y);
          })
          .attr("width", x.rangeBand())  //set width base on range on ordinal data
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

      chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate("+margin.left+","+ height+")")
            .call(xAxis)
            .selectAll("text")
               .style("text-anchor", "end")
               .attr("dx", "-.8em")
               .attr("dy", ".15em")
               .attr("transform", "rotate(-65)" );

      chart.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate("+margin.left+",0)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(title);
    // });

    function type(d) {
        d.x = +d.x; // coerce to number
        return d;
      }
}


function drawLineChart(fileName,tab) {

    d3.json(fileName, function(error, data) {
        // console.log(data);

    var dataGroup = d3.nest()
        .key(function(d) {return d.continent;})
        .entries(data);


    // console.log(JSON.stringify(dataGroup));
    var color = d3.scale.category10();
    var vis = d3.select(tab),
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
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);
    vis.append("svg:g")
        .attr("class", "y axis")
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
            .attr("class","legend")
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
      .attr("class", "legend")
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
        //   console.log(d.key);
        var text = d.key;
        return text;
      });


    });

}
