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
  .style('background',"#cacaca")
  .style('padding','30px')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', function(rows){
    redraw(rows)
  })
}

// redraw function
let redraw = (data) => {
  // data convert to score and assing into socre
  var score = [];
  for (var i = 0; i < data.length; i++) {
    score[i] = Number(data[i].GoalsScored)
  }



  // draw data score into html

  // for scaling
  // for scaling y
  var yScale = d3.scaleLinear()
      .domain([d3.max(score),0])
      .range([0, height])
  // for scaling x
  var xScale = d3.scaleLinear()
      .domain([0, score.length])
      .range([0, width])


var yAxis = d3.axisLeft(yScale)
var xAxis = d3.axisBottom(xScale).ticks(score.length,'s')
  // manual
  // svg.selectAll('rect')
  //   .data(score)
  //   .enter()
  //   .append('rect')
  //   .attr('class', 'bar')
  //   .attr('x', (d, i) => {
  //     return i * 22
  //   })
  //   .attr('y', (d) => {
  //     return 300 - d * 70
  //   })
  //   .attr('width', 15)
  //   .attr('height', (d) => {
  //     return d * 70
  //   })

  // using sclae
  // svg.selectAll('rect')
  //   .data(score)
  //   .enter()
  //   .append('rect')
  //   .attr('class', 'bar')
  //   .attr('x', (d, i) => {
  //     return  xScale(i)
  //   })
  //   .attr('y', (d) => {
  //     return yScale(d)
  //   })
  //   .attr('width', width / score.length - 3 )
  //   .attr('height', (d) => {
  //     return height - yScale(d)
  //   })

  svg.selectAll('rect')
    .data(score)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return  xScale(i)
    })
    .attr('y', (d) => {
      return yScale(d)
    })
    .transition()
    .style("fill", "blue")
    .delay(2000)
    .attr('width', width / score.length - 3 )
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
