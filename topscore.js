/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

let color = d3.scaleLinear()
  .domain([0,5,10,25,40,100])
  .range(["#ddd", "#511fc6", "#c41fbc", "#30ba30", "#63cfe2", "#efe940"]);


function drawCloud(wordArr){
  d3.layout.cloud().size([900, 250])
          .words(wordArr)
          .rotate(0)
          .fontSize(function(d) { return d.size*2; })
          .on("end", draw)
          .start();
}

function draw(words) {
    d3.select("#top-score").append("svg")
            .attr("width", 800)
            .attr("height", 300)
            .attr("class", "wordcloud")
            .append("g")
            // without the transform, words words would get cutoff to the left and top, they would
            // appear outside of the SVG area
            .attr("transform", "translate(350,150)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("fill", function(d, i) { return color(d.size); })
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.spin + ")";
            })
            .text(function(d) { return d.text; });
}

const load = () => {
  let wordsArr = []
  d3.tsv('stats.tsv', (words) => {
    words.forEach(function(word){
      let angle = [0, 90, 0, 0]
      let spin = angle[Math.floor(Math.random()*4)]
      wordsArr.push({text: word.Name, size: word.G, spin: spin})
    })
    drawCloud(wordsArr)
  })
}

load()
