// let store1 = {}
// var format = d3.format(",");
// var xtip = d3.tip()
//             .attr('class', 'd3-tip')
//             .offset([-10, 0])
//             .html(function(d) {
//               return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Change: </strong><span class='details'>"+ format(d.CHANGE) +"</span>";
//             })
// var margin = {top: 0, right: 0, bottom: 0, left: 0},
//             width = 960 - margin.left - margin.right,
//             height = 500 - margin.top - margin.bottom;
// var dcolor = d3.scaleThreshold()
//     .domain([-0.4,-0.3,-0.2,-0.1,0,0.1,0.2,0.3,0.4,0.5, 0.6,100])
//     .range(["rgb(255,69,0)", "rgb(255,127,80)", "rgb(255,140,0)", "rgb(255,215,0)", "rgb(255,255,255)", "rgb(173,216,230)","rgb(135,206,235)","rgb(30,144,255)","rgb(65,105,225)","rgb(0,0,205)","rgb(0,0,128)", "rgb(255,255,255)"]);
//
// var scolor = d3.scaleThreshold()
//     .domain([-1.5,-1.35,-1.2,-1.05,-0.9,-0.75,-0.6,-0.45, -0.3, -0.15,0,100])
//     .range(["rgb(51,51,0)", "rgb(102,102,0)", "rgb(153,153,0)", "rgb(204,204,0)", "rgb(255,255,0)", "rgb(255,255,51)","rgb(255,255,102)","rgb(255,255,153)","rgb(255,255,204)",
//       "rgb(255,255,204)","rgb(255,255,204)","rgb(255,255,255)"]);
//
// var path = d3.geoPath();
// var svg2 = d3.select("#svg2")
//             .append("svg2")
//             .attr("width", width)
//             .attr("height", height)
//             .append('g')
//             .attr('class', 'map');
// var projection = d3.geoMercator()
//                    .scale(130)
//                   .translate( [width / 2, height / 1.5]);
// var path = d3.geoPath().projection(projection);
// svg2.call(xtip);
// var whichCountries = null;
// function loadData()
// {
//
// loadTopCountry();
//
// }
// function loadTopCountry()
// {
//   whichCountries = "top"
//   queue()
//   .defer(d3.json, "countries.geo.json")
//   .defer(d3.csv, "Q2_Top_10.csv")
//   .await(ready);
//
// }
//
// function loadBottomCountry()
// {
//   whichCountries = "bottom"
//   queue()
//   .defer(d3.json, "countries.geo.json")
//   .defer(d3.csv, "Q2_Bottom 10.csv")
//   .await(ready);
//
// }
// function getTopCountry(){
//   let width = window.innerWidth;
//   let height = window.innerHeight;
//   let container = d3.select('#top_svg');
//   container.attr("width", width).attr("height", height);
//   return {width, height, container}
// }
//
// function getBottomCountry(){
//   let width = window.innerWidth;
//   let height = window.innerHeight;
//   let container = d3.select('#bottom_svg');
//   container.attr("width", width).attr("height", height);
//   return {width, height, container}
// }
//
// function ready(error,data,dataset)
// {
//   if (whichCountries == "top") {
//
//     let top_country_config = getTopCountry();
//     top_country_container_svg = top_country_config.container;
//     display(top_country_container_svg,data,dataset,dcolor);
//     loadBottomCountry();
//
//   }
//
//   if (whichCountries == "bottom")
//   {
//     let bottom_country_config = getBottomCountry();
//     bottom_country_container_svg = bottom_country_config.container;
//     display(bottom_country_container_svg,data,dataset,scolor);
//   }
//
//
//
// }
//
// loadData();
//
// function extend(obj, src) {
//     var objArray = []
//     for (var key in obj) {
//          var newobject1 = {}
//          newobject1 = obj[key]
//          objArray.push(newobject1)
//         }
//     for(var key in src)
//     {
//       var newobject2 = {}
//       newobject2 = src[key];
//       objArray.push(newobject2);
//     }
//   return objArray;
// }
//
// function display(container, data, dataset, rcv_clr_or_dnr_clr) {
//   var countryiesById = {};
//
//
//   var topData = dataset.sort(function(a, b) {
//           return d3.descending(+a.CHANGE, +b.CHANGE);
//         }).slice(0,10)
//   // topData.forEach(function(d) { countryiesById[d.Country] = +d["CHANGE"]; });
//   // console.log(countryiesById)
//
//   var bottomData = dataset.sort(function(a, b) {
//                 return d3.ascending(+a.CHANGE, +b.CHANGE);
//               }).slice(0,10)
//
//   allData = extend(topData, bottomData);
//
//   allData.forEach(function(d) { countryiesById[d.Country] = +d["CHANGE"] });
//     data.features.forEach(function(d) { d["CHANGE"] = countryiesById[d.properties.name] });
//     container.append("g")
//       .attr("class", "countries")
//       .selectAll("path")
//       .data(data.features)
//       .enter().append("path")
//       .attr("d", path)
//       .style("fill", function(d) {
//         if (countryiesById[d.properties.name] == undefined)
//         {
//           return rcv_clr_or_dnr_clr (100);
//         }
//         else
//         {
//           return rcv_clr_or_dnr_clr(countryiesById[d.properties.name]);
//         }})
//       .style('stroke', 'white')
//       .style('stroke-width', 1.5)
//       .style("opacity",0.8)
//         .style("stroke","white")
//         .style('stroke-width', 0.3)
//         .on('mouseover',function(d){
//           xtip.show(d);
//           d3.select(this)
//             .style("opacity", 1)
//             .style("stroke","white")
//             .style("stroke-width",3);
//         })
//         .on('mouseout', function(d){
//           xtip.hide(d);
//           d3.select(this)
//             .style("opacity", 0.8)
//             .style("stroke","white")
//             .style("stroke-width",0.3);
//         });
//   container.append("path")
//       .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
//       .attr("class", "names")
//       .attr("d", path);
// }
