/* global d3 */



// Our canvas
const width = 750,
    height = 300,
    margin = 20
marginLeft = 40

const multiplier = 50

// Drawing area
let svg = d3.select('#results')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', 'orange')

// Data reloading
let reload = () => {
    var database = []
    d3.tsv("afcw-results.tsv", function(data) {
        data.forEach(function(getData) {
            database.push(getData.GoalsScored)
        });
        redraw(database)
    })
    // console.log(database);
    // redraw(database)
    // Your data parsing here...
}

// redraw function
let redraw = (database) => {
  // console.log(width/database.length);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(database)])
        .range([0, height])


    svg.selectAll('rect')
        .data(database)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => {
            return i * width/database.length
        })
        .attr('y', (d) => {
            return height - yScale(d)
        })
        .attr('width', width/database.length)
        .attr('height', (d) => {
            return yScale(d)
        })
}

// redraw([5,10,15,20,25])
reload()
