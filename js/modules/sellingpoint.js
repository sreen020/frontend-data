import nlData from "./nltopo.js";

export function showSellingpoint(data) {
  const svg = d3.select("svg");
  const g = d3.select("g");

  var projection = d3.geoMercator().scale(6000).center([5.916667, 52.47]);
  
    g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("r", 3)
      .attr("cx", function(d) { return projection([d.location.longitude, d.location.latitude])[0] })
      .attr("cy", function(d) { return projection([d.location.longitude, d.location.latitude])[1] })
      .on("mouseover", mouseOver)
      .on("mousemove", mouseMove)
      .on("mouseout", mouseOut)

    // create a tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('opacity', 1)
      .style('z-index', '10')

      function mouseOver(d, i) {
        tooltip
          .append("p")
            .text(i.sellingpointdesc)
            .style("opacity", 1.0)
            .attr("class", "title")
      }

      function mouseMove(event) {
        tooltip
          .style('top', (event.pageY-10)+'px')
          .style('left',(event.pageX+10)+'px')
          .style("opacity", 1.0)
      }

      function mouseOut(d, i) {
        tooltip
          .style("opacity", 0)
          .selectAll("p").remove();
      }
}