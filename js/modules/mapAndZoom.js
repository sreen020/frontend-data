// import data
import nlData from "./dutchTopoData.js";

// This function makes the map zoom on a specific area using d3.zoom
// data get fetched this function is a promise 
export const zoomFunction = nlData().then((data) => {

  // making global d3 variables 
  const path = d3.geoPath();
  const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

  const width = 975;
  const height = 610;

  // svg main container with the map
  const svg = d3
    .select("svg")
    .attr("viewBox", [0, 0, width, height])
    .on("click", reset);

  // projection is the way of showing the map
  const g = svg.append("g");
  const projection = d3.geoMercator().scale(6000).center([5.916667, 52.47]);
  const pathGenerator = path.projection(projection);

  // The dutch map is getting splitt in Areas
  const area = g
    .append("g")
    .attr("fill", "#444")
    .attr("cursor", "pointer")
    .selectAll("path")
    .data(topojson.feature(data, data.objects.gemeente_2020).features)
    .join("path")
    .on("click", clicked)
    .attr("d", path);

  svg.call(zoom);

  // this function reset the zoom function and change the color back to normal
  function reset() {
    area.transition().style("fill", null);
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      );
  }

  // When clicked on an "area" this function will zoom on that speciffic are
  // source: https://observablehq.com/@d3/zoom-to-bounding-box
  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    area.transition().style("fill", null);
    d3.select(this).transition().style("fill", "#2e5f74");
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(
            Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
      );
  }

  // source: https://observablehq.com/@d3/zoom-to-bounding-box
  function zoomed(event) {
    const { transform } = event;

    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);

    svg.select("g").selectAll("circle")
      .attr("r", 3 /transform.k);
  }
});

