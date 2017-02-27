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
  .style('background', '#cacaca')
  .style('padding', '30px')

// Data reloading
let reload = () => {

  let dataset = []
  d3.tsv('afcw-results.tsv', (rows) => {
    rows.forEach((item) => {
      dataset.push(item.GoalsScored)
    })
    redraw(dataset)
  })
}

// redraw function
let redraw = (dataset) => {

  let temp = dataset.map((item) => {
    return parseInt(item)
  })

  let goal = Math.max(...temp)

  const yScale = d3.scaleLinear()
    .domain([goal, 0])
    .range([0, height])

  const xScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, width])

  const yAxis = d3.axisLeft(yScale)
  const xAxis = d3.axisBottom(xScale).ticks(dataset.length, 's')



  let multiplier = height / goal

  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return xScale(i)
    })
    .attr('y', (d) => {
      return yScale(d)
    })
    .attr('width', width / dataset.length - 3)
    .attr('height', (d) => {
      return height - yScale(d)
    })
    .attr('fill', 'pink')

  svg.append('g')
    .attr('transform', 'rotate(0)')
    .call(yAxis)

  svg.append('g').attr('transform', `translate(0,${height})`)
    .call(xAxis)

    // Your data to graph here

}

reload()
