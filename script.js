/* global d3 */

// Our canvas
const width = 750;
const height = 300;
const margin = 20;
const marginLeft = 40;

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background-color', 'grey')
  .attr('fill', 'black')
  .style('margin', margin)

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
    .domain([4.5, 0])
    .range([0, height])
  const xScale = d3.scaleLinear()
    .domain([0, datas.length])
    .range([25, width-10])
  svg.selectAll('rect')
    .data(datas)
    .enter()
    .append('rect')
    .attr('width', (width/datas.length)-2)
    .attr('x', (data, index) => {
      return xScale(index)
    })
    .attr('y', (data) => {
      return height -20
    })
    .transition()
    .duration(2000)
    .delay(function (data, index) {
				return index * 50;
			})
    .attr('class', 'bar')
    .attr('height', (data) => {
      return height - yScale(data)
    })
    .attr('y', (data) => {
      return yScale(data)-20
    })

    var xAxis = d3.axisBottom(xScale)
      .ticks(datas.length)
    svg.append('g')
      .attr('transform', 'translate(0, 280)')
      .call(xAxis)
    var yAxis = d3.axisLeft(yScale)
    svg.append('g')
      .attr('transform', 'translate(25, -20)')
      .call(yAxis)
}



reload()
