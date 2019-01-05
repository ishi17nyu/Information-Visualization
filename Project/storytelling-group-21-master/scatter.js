const xValue = d => d["Log of GDP per person, 2015-2017"];
const xLabel = 'Log of GDP per person, 2015-2017';
const yValue = d => d["Life ladder, 2015-2017"];
const yLabel = 'Life ladder, 2015-2017';
const colorValue = d => d["Region indicator"];
const colorLabel = 'Regions';
const margin1 = { top: 50, right: 300, bottom: 50, left: 50 };

const svg1 = d3.select('#svgscatter');
const width1 = svg1.attr('width');
const height1 = svg1.attr('height');
const innerWidth1 = width1 - margin1.left - margin1.right;
const innerHeight1 = height1 - margin1.top - margin1.bottom;

const g = svg1.append('g')
    .attr('transform', `translate(${margin1.left},${margin1.top})`);
const xAxisG = g.append('g')
    .attr('transform', `translate(0, ${innerHeight1})`);
const yAxisG = g.append('g');
const colorLegendG = g.append('g')
    .attr('transform', `translate(${innerWidth1 + 60}, 150)`);

xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth1 / 2)
    .attr('y', 45)
    .text(xLabel);

yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', -30)
    .attr('y', -25)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabel);

colorLegendG.append('text')
    .attr('class', 'legend-label')
    .attr('x', -30)
    .attr('y', -40)
    .text(colorLabel);

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);

const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickPadding(15)
  .tickSize(-innerHeight1);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(5)
  .tickPadding(15)
  .tickSize(-innerWidth1);

const colorLegend = d3.legendColor()
  .scale(colorScale)
  .shape('circle');

const row = d => {
  d["Log of GDP per person, 2015-2017"] = +d["Log of GDP per person, 2015-2017"];
  d["Life ladder, 2015-2017"] = +d["Life ladder, 2015-2017"];
  return d;
};

d3.csv('happiness_data.csv', row, data => {
  xScale
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth1])
    .nice();

  yScale
    .domain(d3.extent(data, yValue))
    .range([innerHeight1, 0])
    .nice();

  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cx', d => xScale(xValue(d)))
      .attr('cy', d => yScale(yValue(d)))
      .attr('fill', d => colorScale(colorValue(d)))
      .attr('fill-opacity', 0.6)
      .attr('r', 8);

  xAxisG.call(xAxis);
  yAxisG.call(yAxis);
  colorLegendG.call(colorLegend)
    .selectAll('.cell text')
      .attr('dy', '0.1em');
});
