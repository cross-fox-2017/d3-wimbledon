/* global d3 */

// Our canvas
const width = 750;
const height = 300;
const margin = 20;
const marginLeft = 40;
const multiplier = 40;

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background-color', 'grey')
  .attr('fill', 'black')

// Data reloading
let reload = () => {
  let data = []
  d3.tsv('afcw-results.tsv', (rows) => {
    rows.forEach(function(row){
      data.push(row.GoalsScored)
    })
    redraw(data)
  })
}

// redraw function
let redraw = (datas) => {
  const yScale = d3.scaleLinear()
    .domain([0, 5])
    .range([0, height])
  const xScale = d3.scaleLinear()
    .domain([0, datas.length])
    .range([0, width])
  svg.selectAll('rect')
    .data(datas)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (data, index) => {
      return xScale(index)
    })
    .attr('y', (data) => {
      return height - yScale(data)
    })
    .attr('width', (width/datas.length)-2)
    .attr('height', (data) => {
      return yScale(data)
    })

    var xAxis = d3.axisBottom(xScale)
      .ticks(20)

    svg.append('g')
      .attr('transform', 'translate(0, 280)')
      .call(xAxis)
}



reload()
