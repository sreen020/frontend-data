import nlData from "./dutchTopoData.js";

// SHOW CIRCLES ON MAP AND ADD TOOLTIP
export function showSellingpoint(data) {
  // Setup global variables
  const svg = d3.select("svg");
  const g = d3.select("g");
  const projection = d3.geoMercator().scale(6000).center([5.916667, 52.47]);

  setPoints(data);
  filterPointsByYears(data);

  // This function places points on the map using lat and long
  function setPoints(data) {
    const points = g.selectAll('circle').data(data)
    const totalAmount = d3.select(".totalAmount")

    // circle element is being created for each data object, with cx and cy attributes the circles are placed correctly
    points.enter()
        .append('circle')
        .attr("r", 3)
        .attr("cx", function(d) { return projection([d.location.longitude, d.location.latitude])[0] })
        .attr("cy", function(d) { return projection([d.location.longitude, d.location.latitude])[1] })
        .on("mouseover", mouseOver)
        .on("mousemove", mouseMove)
        .on("mouseout", mouseOut)
        .transition()
        .duration(2000)

    // removes circles for the filter options
    points.exit()
          .remove()

    // shows a text with the current amount of circles showed on the map
    totalAmount
      .text("Aantal parkeerautomaten: " + data.length)
  }

  // create the tooltip with styling
  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('opacity', 1)

  // On mouseOver show tooltip and input tekst 
  function mouseOver(d, i) {
    tooltip
      .append("p")
        .text(i.sellingpointdesc)
        .style("opacity", 1.0)
        .attr("class", "title")
  }

  // This function changes position of the tooltip to the specific point
  function mouseMove(event) {
    tooltip
      .style('top', (event.pageY-10)+'px')
      .style('left',(event.pageX+10)+'px')
      .style("opacity", 1.0)
  }

  // hide tooltip
  function mouseOut(d, i) {
    tooltip
      .style("opacity", 0)
      .selectAll("p").remove();
  }

  //FILTER 
  function filterPointsByYears(data) {
    const resetBtn = d3.select(".reset-button")

    // array with all unfiltered years
    const arrayWithAllYears = [];

    // The array above get filled with all years
    data.forEach(element => {
      arrayWithAllYears.push(element.startdatesellingpoint ? element.startdatesellingpoint.slice(0, 4) : null);
    });

    // filter out the unique values
    // source: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    const makeArrUnique = (value, index, self) => {
      if (value != null) {
        return self.indexOf(value) === index
      }
    }

    // Use the func above to filter out all the unique years and order from low to high (ascending)
    const filteredUniqueValues = arrayWithAllYears.filter(makeArrUnique)
    filteredUniqueValues.sort(d3.ascending)

    // Make a div inside the form element for each year
    const form = d3.select("form")
    .selectAll("div")
      .data(filteredUniqueValues)
      .enter()
    .append("div")
      .attr("class", "radioBtn")
    
    // inside the div make an input with the id of the year array. If label get clicked the function changeyear will be triggered
    form.append("input")
      .attr("type", "radio")
      .attr("name", "radio")
      .attr("id", (d,i) => filteredUniqueValues[i])
      .on("change", (d, i) => {
        changeYear(i);
      })
    
    // inside the div make a label with the text of the specific year
    form.append("label")
      .attr("for", (d,i) => filteredUniqueValues[i])
      .text((d,i) => filteredUniqueValues[i])

    // i = the year being clicked. this function changes the point on the map for the chosen year
    function changeYear(i) {
      const filteredYear = data.filter(row => row.startdatesellingpoint ? row.startdatesellingpoint.slice(0, 4) == i : null)
      setPoints(filteredYear);
    }

    // removes chosen filter and uncheck radiobuttons
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
  }
}