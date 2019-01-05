let store = {}

var format = d3.format(",");


var xtip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Happiness Index: </strong><span class='details'>"+ format(d.Happiness_Index_2018) +"</span>";
            })


var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

var dcolor = d3.scaleThreshold()
    .domain([1,2,3,4,5,6,7,8,9,10])
    .range(["rgb(247,251,255)", "rgb(224,224,224)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);



var path = d3.geoPath();

var svg = d3.select("#Q3_map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

var projection = d3.geoMercator()
                   .scale(130)
                  .translate( [width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);

svg.call(xtip);


function loadData()
{
  queue()
  .defer(d3.json, "countries.geo.json")
  .defer(d3.csv, "happiness_data.csv")
  .await(ready);
}

function getDonor(){
  let width = window.innerWidth;
  let height = window.innerHeight;
  let container = d3.select('#Q3_map');
  container.attr("width", width).attr("height", height);
  return {width, height, container}
}


function ready(error,data,dataset)
{
  let donor_config = getDonor();
  donor_container_svg = donor_config.container;
  display(donor_container_svg,data,dataset,dcolor);
}


loadData();

function extend(obj, src) {
    var objArray = []

    for (var key in obj) {
         var newobject1 = {}
         newobject1 = obj[key]
         objArray.push(newobject1)
        }

    for(var key in src)
    {
      var newobject2 = {}
      newobject2 = src[key];
      objArray.push(newobject2);
    }
  return objArray;
}

function display(container, data, dataset, rcv_clr_or_dnr_clr) {
  var countryiesById = {};


    // dataset.forEach(function(d) { countryiesById[d.Country] = +d["Happiness_Index_2018"]; });
    // console.log(countryiesById)


    var topData = dataset.sort(function(a, b) {
            return d3.descending(+a.Happiness_Index_2018, +b.Happiness_Index_2018);
          }).slice(0,10)
    // topData.forEach(function(d) { countryiesById[d.Country] = +d["Happiness_Index_2018"]; });
    // console.log(countryiesById)

    var bottomData = dataset.sort(function(a, b) {
                  return d3.ascending(+a.Happiness_Index_2018, +b.Happiness_Index_2018);
                }).slice(0,10)

    allData = extend(topData, bottomData);

    allData.forEach(function(d) { countryiesById[d.Country] = +d["Happiness_Index_2018"] });
    data.features.forEach(function(d) { d["Happiness_Index_2018"] = countryiesById[d.properties.name] });



  container.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(data.features)
      .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) {
        if (countryiesById[d.properties.name] == undefined)
        {
          return rcv_clr_or_dnr_clr (1);
        }
        else
        {
          return rcv_clr_or_dnr_clr(countryiesById[d.properties.name]);
        }})
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          xtip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          xtip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });

  container.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);


}
