/* global d3 */

// Our axis

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'rgb(2,132,130)')
  .attr('style', 'background-color:rgb(240,240,240); padding:40px;')

// Data reloading
let reload = () => {
  let data = []

  d3.tsv('afcw-results.tsv', (rows) => {
    rows.forEach(doc => {
      data.push(doc.GoalsScored)
    })
    redraw(data)
  })
}

// redraw function
let redraw = (data) => {
  let multiplier = 75

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * (width / data.length)
    })
    .attr('y', d => {
      return 300 - d * multiplier
    })
    .attr('width', (width / data.length) - 2)
    .attr('height', d => {
      return d * multiplier
    })

  var axisScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, 745])

  var axisScale2 = d3.scaleLinear()
    .domain([4, 0])
    .range([0, 280])

  var xAxis = d3.axisBottom(axisScale)
    .ticks(20, 's')

  var yAxis = d3.axisLeft(axisScale2)
    .ticks(10, 'f')

  var xAxisGroup = svg.append('g')
    .attr('transform', 'translate(0,300)')
    .call(xAxis)

  var xAxisGroup2 = svg.append('g')
    .attr('transform', 'translate(0,0)')
    .call(yAxis)
}

reload()
