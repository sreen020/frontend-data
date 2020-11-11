// import { setPoints } from './sellingpoint.js'
// // deze functie moet selecteren uit welk jaar de getoonde punten komen

// // Filter the data and make a new array with the filtered data
// export function GetYearsArr(data) {
//   // array with all unfiltered years
//   const arrayWithAllYears = [];

//   // The array above get filled with all years
//   data.forEach(element => {
//     arrayWithAllYears.push(element.startdatesellingpoint.slice(0, 4));
//   });

//   // filter out the unique values
//   const makeArrUnique = (value, index, self) => {
//     return self.indexOf(value) === index
//   }

//   // Use the func above to filter out all the unique years
//   const filteredUniqueValues = arrayWithAllYears.filter(makeArrUnique)
//   filteredUniqueValues.sort(d3.ascending)
//   console.log(filteredUniqueValues);


//   // Make a div inside form for each year
//   const form = d3.select("form")
//   .selectAll("div")
//   .data(filteredUniqueValues)
//   .enter()
//   .append("div")
//   .attr("class", "radioBtn")
  
//   // inside the div make a input with the name of the year array
//   form.append("input")
//     .attr("type", "radio")
//     .attr("name", "Radio")
//     .attr("id", (d,i) => filteredUniqueValues[i])
//     .on("change", (d, i) => {
//       changeYear(i);
//     })
  
//   // inside the div make a label with the text of the year array
//   form.append("label")
//     .attr("for", (d,i) => filteredUniqueValues[i])
//     .text((d,i) => filteredUniqueValues[i])

//     // Filter the data and make a new array with the filtered data
//     function changeYear(i) {
//       const filteredYear = data.filter(row => row.startdatesellingpoint.slice(0, 4) == filterValue)
//       setPoints(filteredYear);
//     }
// }