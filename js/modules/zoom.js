import nlData from "./nltopo.js";

export const zoommFunction = nlData().then((data) => {
  const path = d3.geoPath();
  const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

  const width = 975;
  const height = 610;

  const svg = d3
    .select("svg")
    .attr("viewBox", [0, 0, width, height])
    .on("click", reset);

  const g = svg.append("g");
  const projection = d3.geoMercator().scale(6000).center([5.916667, 52.47]);
  const pathGenerator = path.projection(projection);

  const gemeentes = g
    .append("g")
    .attr("fill", "#444")
    .attr("cursor", "pointer")
    .selectAll("path")
    .data(topojson.feature(data, data.objects.gemeente_2020).features)
    .join("path")
    .on("click", clicked)
    .attr("d", path);

  gemeentes.append("title").text((d) => d.properties.statname);

  svg.call(zoom);

  function reset() {
    gemeentes.transition().style("fill", null);
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      );
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    gemeentes.transition().style("fill", null);
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

  function zoomed(event) {
    const { transform } = event;

    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);

    svg.select("g").selectAll("circle")
      .attr("r", 3 /transform.k);
  }
});

