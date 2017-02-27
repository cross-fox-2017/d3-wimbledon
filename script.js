/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

const yScale = d3.scaleLinear()
      .domain([0,4])
      .range([0,height])

const xScale = d3.scaleLinear()
      .domain([0,46])
      .range([0,width])

const axisL = d3.axisLeft(yScale)
const axisB = d3.axisBottom(xScale)

let multiplier = 49
// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)


// Data reloading
let reload = () => {
  // Your data parsing here...
  let dataz =[]
  d3.tsv("afcw-results.tsv", function(data) {
    data.forEach(function(x){
      dataz.push(x.GoalsScored)
    })
    redraw(dataz)
});
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x',(d,i)=>{
        return xScale(i)
      })
      .attr('y',(d)=>{
        return 300 - yScale(d)
      })
      .attr('width',(width/data.length)-2)
      .attr('height',(d)=>{
        return yScale(d)
      })
}

reload()
