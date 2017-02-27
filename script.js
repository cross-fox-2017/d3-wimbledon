/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    redraw(rows)
  })

}

// redraw function
let redraw = (data) => {
  let score = [];
  for (var i = 0; i < data.length; i++) {
    score[i] = Number(data[i].GoalsScored)
  }
  // console.log(score);
  // Your data to graph here
  const yScale = d3.scaleLinear()
  .domain([0,4])
  .range([0,height])

  const xScale = d3.scaleLinear()
  .domain([0,data.length])
  .range([0,width])

  svg.selectAll('rect')
      .data(score)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => {
        return xScale(i)
      })
      .attr('y', (d) => {
        return 300 - yScale(d)
      })
      .attr('width', (width/data.length)-2)
      .attr('height', (d) => {
        return d * 80
      })

}

reload()
