import nlData from "./nltopo.js";
// import { GetYearsArr } from "./filter.js";

export function showSellingpoint(data) {
  const svg = d3.select("svg");
  const g = d3.select("g");
  const projection = d3.geoMercator().scale(6000).center([5.916667, 52.47]);

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

    function setPoints(data) {
      const points = g.selectAll('circle').data(data)

      points 
        .attr("cx", function(d) { return projection([d.location.longitude, d.location.latitude])[0] })
        .attr("cy", function(d) { return projection([d.location.longitude, d.location.latitude])[1] })
    
      points.enter()
          .append('circle')
          .attr("r", 3)
          .attr("cx", function(d) { return projection([d.location.longitude, d.location.latitude])[0] })
          .attr("cy", function(d) { return projection([d.location.longitude, d.location.latitude])[1] })
          .on("mouseover", mouseOver)
          .on("mousemove", mouseMove)
          .on("mouseout", mouseOut)

      points.exit()
            .remove()
      }

        // array with all unfiltered years
  const arrayWithAllYears = [];

  // The array above get filled with all years
  data.forEach(element => {
    arrayWithAllYears.push(element.startdatesellingpoint.slice(0, 4));
  });

  // filter out the unique values
  const makeArrUnique = (value, index, self) => {
    return self.indexOf(value) === index
  }

  // Use the func above to filter out all the unique years
  const filteredUniqueValues = arrayWithAllYears.filter(makeArrUnique)
  filteredUniqueValues.sort(d3.ascending)
  console.log(filteredUniqueValues);


  // Make a div inside form for each year
  const form = d3.select("form")
  .selectAll("div")
  .data(filteredUniqueValues)
  .enter()
  .append("div")
  .attr("class", "radioBtn")
  
  // inside the div make a input with the name of the year array
  form.append("input")
    .attr("type", "radio")
    .attr("name", "Radio")
    .attr("id", (d,i) => filteredUniqueValues[i])
    .on("change", (d, i) => {
      changeYear(i);
    })
  
  // inside the div make a label with the text of the year array
  form.append("label")
    .attr("for", (d,i) => filteredUniqueValues[i])
    .text((d,i) => filteredUniqueValues[i])

  // Filter the data and make a new array with the filtered data
  function changeYear(i) {
    const filteredYear = data.filter(row => row.startdatesellingpoint.slice(0, 4) == i)
    setPoints(filteredYear);
  }

  const resetBtn = d3.select(".reset-button")

  resetBtn
    .on("click", function() {
      setPoints(data)
      uncheckAllRadio()
    })

    function uncheckAllRadio() {
      const radioBtns = d3.selectAll("input[type=radio]")
      radioBtns
        .property("checked", false)
    }

  setPoints(data);
}





// // Filter the data and make a new array with the filtered data
