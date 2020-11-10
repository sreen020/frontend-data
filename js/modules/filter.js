// deze functie moet selecteren uit welk jaar de getoonde punten komen
export function filterYear(data) {
  console.log(data);
  data.forEach((dataRow) => {
    const getYears = dataRow.startdatesellingpoint.slice(0, 4);
    const getMonths = dataRow.startdatesellingpoint.slice(4, 6);
    const getDays = dataRow.startdatesellingpoint.slice(6, 8);

  })
}