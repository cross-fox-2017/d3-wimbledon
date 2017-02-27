/* global d3 */

// Our canvas
const width = 1000,
      height = 300,
      margin = 20,
      marginLeft = 40,
      multiplier = 50

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background',"rgb(196, 196, 196)")
  .style('padding','30px')

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

  // Y Scaling
  var yScale = d3.scaleLinear()
  .domain([d3.max(goals),0])
  .range([0, height])
  // X Scaling
  var xScale = d3.scaleLinear()
  .domain([0, goals.length])
  .range([0, width])

  var yAxis = d3.axisLeft(yScale)
  var xAxis = d3.axisBottom(xScale).ticks(goals.length,'s')

  svg.selectAll('rect')
    .data(goals)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
       return xScale(i)
     })
    .attr('y', (d) => {
       return height
     })
    .attr('width', (width - 200)/goals.length)
    .transition()
    .duration(750)
    .attr("height", 0)
    .transition()
		.duration(200)
    .attr('y', (d) => {
      return yScale(d)
    })
    .attr('height', (d) => {
      return height - yScale(d)
    })

     svg.append('g')
     .attr('transform','rotate(0)')
     .call(yAxis)

     svg.append('g')
     .attr('transform',`translate(0,${height})`)
     .call(xAxis)

}

reload()
