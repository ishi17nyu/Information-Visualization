let store = {}

var format = d3.format(",");


var q1_xtip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Happiness Index: </strong><span class='details'>"+ format(d.Happiness_Index_2018) +"</span>";
            })

var q2_xtip = d3.tip()
                        .attr('class', 'd3-tip')
                        .offset([-10, 0])
                        .html(function(d) {
                          return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Happiness Change: </strong><span class='details'>"+ format(d.CHANGE) +"</span>";
                        })

var q3_xtip = d3.tip()
                                                .attr('class', 'd3-tip')
                                                .offset([-10, 0])
                                                .html(function(d) {
                                                  return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Happiness Foreign: </strong><span class='details'>"+ format(d.AVG_Happiness_Foreign) +"</span>";
                                                })
var complete_xtip = d3.tip()
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


var dcolor1 = d3.scaleThreshold()
        .domain([-1,-0.75,-0.5,-0.25,0,0.25,0.5,0.75,1,1.25, 1.50,100])
        .range(["rgb(255,69,0)", "rgb(255,127,80)", "rgb(255,140,0)", "rgb(255,215,0)", "rgb(255,250,205)", "rgb(173,216,230)","rgb(135,206,235)","rgb(30,144,255)","rgb(65,105,225)","rgb(220,220,220)","rgb(220,220,220)", "rgb(220,220,220)"]);
var dcolor2 = d3.scaleThreshold()
            .domain([1,2,3,4,5,6,7,8,9,10])
            .range(["rgb(247,251,255)", "rgb(224,224,224)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);
var dcolor3 = d3.scaleThreshold()
                .domain([1,2,3,4,5,6,7,8,9,10])
                .range(["rgb(247,251,255)", "rgb(224,224,224)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);
var path = d3.geoPath();

var q1_svg = d3.select("#topBottom")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

q1_svg.call(q1_xtip);

var projection = d3.geoMercator()
                   .scale(130)
                  .translate( [width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);


var q2_svg = d3.select("#svg2")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

q2_svg.call(q2_xtip);

var q3_svg = d3.select("#Q3_map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

q3_svg.call(q3_xtip);

var q3_svg = d3.select("#Q1Complete")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

q3_svg.call(complete_xtip);


var whichMap = null;

function loadData()
{
  getMapQ1();

}

function getMapQ1()
{
  whichMap = "Q1"
  queue()
  .defer(d3.json, "countries.geo.json")
  .defer(d3.csv, "happiness_data.csv")
  .defer(d3.csv, "q2_all_countries.csv")
  .defer(d3.csv, "q3.csv")
  .defer(d3.csv, "q1_all_countries.csv")
  .await(ready);
  // getMapQ2();
}

function getMapQ2()
{
  whichMap = "Q2"
  queue()
  .defer(d3.json, "countries.geo.json")
  .defer(d3.csv, "q2_all_countries.csv")
  .await(ready);
  getMapQ3();
}

function getMapQ3()
{
  whichMap = "Q3"
  queue()
  .defer(d3.json, "countries.geo.json")
  .defer(d3.csv, "q3.csv")
  .await(ready);
}

function getCompletMap()
{
  whichMap = "completeMap"
  queue()
  .defer(d3.json, "countries.geo.json")
  .defer(d3.csv, "q1_all_countries.csv")
  .await(ready);
}

function getMapQ1Config(){
  let width = window.innerWidth;
  let height = window.innerHeight;
  let container = d3.select('#topBottom');
  container.attr("width", width).attr("height", height);
  return {width, height, container}
}

function getMapQ2Config()
{
  let width = window.innerWidth;
  let height = window.innerHeight;
  let container = d3.select('#svg2');
  container.attr("width", width).attr("height", height);
  return {width, height, container}
}

function getMapQ3Config()
{
  let width = window.innerWidth;
  let height = window.innerHeight;
  let container = d3.select('#Q3_map');
  container.attr("width", width).attr("height", height);
  return {width, height, container}
}

 function getCompleteMapConfig()
 {
   let width = window.innerWidth;
   let height = window.innerHeight;
   let container = d3.select('#Q1Complete');
   container.attr("width", width).attr("height", height);
   return {width, height, container}
 }

function ready(error,data,dataset,data1,data2,data3)
{
  console.log(whichMap)

  if (whichMap == "Q1") {
  var countryiesById = {};
  let map1_config = getMapQ1Config();

  map1_container_svg = map1_config.container;

  var topData = dataset.sort(function(a, b) {
          return d3.descending(+a.Happiness_Index_2018, +b.Happiness_Index_2018);
        }).slice(0,10)

  var bottomData = dataset.sort(function(a, b) {
                return d3.ascending(+a.Happiness_Index_2018, +b.Happiness_Index_2018);
              }).slice(0,10)
  allData1 = extend(topData, bottomData);
  allData1.forEach(function(d) { countryiesById[d.Country] = +d["Happiness_Index_2018"] });
  data.features.forEach(function(d) { d["Happiness_Index_2018"] = countryiesById[d.properties.name] });

  tip = q1_xtip
  console.log("Map1 " , countryiesById)
  display(map1_container_svg,data,countryiesById,dcolor,tip);


 }


   var map1countryiesById = {};
   let map2_config = getMapQ2Config();
   map2_container_svg = map2_config.container;

   var topData = data1.sort(function(a, b) {
           return d3.descending(+a.CHANGE, +b.CHANGE);
         })

   var bottomData = data1.sort(function(a, b) {
                 return d3.ascending(+a.CHANGE, +b.CHANGE);
               }).slice(0,10)

   allData2 = extend(topData, bottomData);

   allData2.forEach(function(d) { map1countryiesById[d.Country] = +d["CHANGE"] });
   data.features.forEach(function(d) { d["CHANGE"] = map1countryiesById[d.properties.name] });

   tip = q2_xtip
   console.log("Map2 " , map1countryiesById)
   display(map2_container_svg,data,map1countryiesById,dcolor1,tip);

   var map2countryiesById = {};
   let map3_config = getMapQ3Config();
   map3_container_svg = map3_config.container;
   var topData = data2.sort(function(a, b) {
             return d3.descending(+a.AVG_Happiness_Foreign, +b.AVG_Happiness_Foreign);
           }).slice(0,10)

   var bottomData = data2.sort(function(a, b) {
                   return d3.ascending(+a.AVG_Happiness_Foreign, +b.AVG_Happiness_Foreign);
                 }).slice(0,10)

   allData3 = extend(topData, bottomData);

   allData3.forEach(function(d) { map2countryiesById[d.Country] = +d["AVG_Happiness_Foreign"] });
   data.features.forEach(function(d) { d["AVG_Happiness_Foreign"] = map2countryiesById[d.properties.name] });

   tip = q3_xtip
   console.log("Map3 " , map2countryiesById)

   display(map3_container_svg,data,map2countryiesById,dcolor2,tip);

   var map3countryiesById = {};
   let complete_config = getCompleteMapConfig();
   complete_container_svg = complete_config.container;

   var countryiesById = {};
   var topData = data3.sort(function(a, b) {
           return d3.descending(+a.Happiness_Index_2018, +b.Happiness_Index_2018);
         })
   var bottomData = data3.sort(function(a, b) {
                       return d3.ascending(+a.Happiness_Index_2018, +b.Happiness_Index_2018);
                     }).slice(0,10)
   allData4 = extend(topData, bottomData);

   allData4.forEach(function(d) { map3countryiesById[d.Country] = +d["Happiness_Index_2018"] });
   data.features.forEach(function(d) { d["Happiness_Index_2018"] = map3countryiesById[d.properties.name] });

  tip = complete_xtip
  console.log("Complete Map" , map3countryiesById)

  display(complete_container_svg,data,map3countryiesById,dcolor3,tip);

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

function display(container, data, countryiesById, rcv_clr_or_dnr_clr,tip) {
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
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          tip.hide(d);

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
