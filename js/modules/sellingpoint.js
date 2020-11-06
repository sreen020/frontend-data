import nlData from "./nltopo.js";

export function showSellingpoint(data) {
  const svg = d3.select("svg");
  const g = d3.select("g");

  var projection = d3.geoMercator().scale(6000).center([5.916667, 52.47]);

  data.forEach((dataRow) => {
    const long = dataRow.location.longitude;
    const lat = dataRow.location.latitude;
  
    g.append("circle")
      .attr("r", 3)
      .attr("cx", function () { return projection([long, lat])[0] })
      .attr("cy", function () { return projection([long, lat])[1] })
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    // create a tooltip
    var Tooltip = d3.select("svg")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 1)
      .style("background-color", "white")
    .append("p")
      .attr("class", "test")
      .text(dataRow.sellingpointdesc)

    var mouseover = function(dataRow) {
      console.log("mouseover");
      Tooltip.style("opacity", 1)
    }
    var mousemove = function(dataRow) {
      console.log("mousemove");

      Tooltip
        .style("left", (d3.mouse(this)[0]+10) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(dataRow) {
      console.log("mouseleave");
      Tooltip.style("opacity", 0)
    }
  })
  selectYear(data);
}


// deze functie moet selecteren uit welk jaar de getoonde punten komen
function selectYear(data) {

  data.forEach((dataRow) => {
    const getYears = dataRow.startdatesellingpoint.slice(0, 4);
    const getMonths = dataRow.startdatesellingpoint.slice(4, 6);
    const getDays = dataRow.startdatesellingpoint.slice(6, 8);

  })
}
// This function makes the date a readable format
// export function cleanDates(dataRow) {
//   const getYears = dataRow.startdatesellingpoint.slice(0, 4);
//   const getMonths = dataRow.startdatesellingpoint.slice(4, 6);
//   const getDays = dataRow.startdatesellingpoint.slice(6, 8);

//   const date = `${getDays}-${getMonths}-${getYears}`;
//   // console.log(date);

//   // Count the amount of values after a specific year
//   if (getYears > 2018) {
//     // console.log("Aantal values boven 2018");
//   }
// }