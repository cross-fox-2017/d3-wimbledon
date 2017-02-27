/* global d3 */

// Our canvas
const width = 1200,
      height = 300,
      margin = 20,
      marginLeft = 40,
      multiplier = 50

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  d3.tsv("afcw-results.tsv", function(error, data) {
  if (error) throw error;
  goals = []
  data.forEach(function(d) {
    goals.push(d.GoalsScored)
  })
  // console.log(goals);
  redraw(goals)
  })
}

// redraw function
let redraw = (goals) => {
  console.log(goals.length);
  svg.selectAll('rect')
    .data(goals)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
       return i * (width)/goals.length
     })
    .attr('y', (d) => {
       return 300 - d * multiplier
     })
    .attr('width', (width - 200)/goals.length)
    .attr('height', (d) => {
       return d * multiplier
     })

}

reload()
