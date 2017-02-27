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
let redraw = (data) => {
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (data, i) => {
      return i * 22
    })
    .attr('y', (data) => {
      return 300 - data
    })
    .attr('width', 20)
    .attr('height', (data) => {
      return data
    })
}

reload()
