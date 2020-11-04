// import { json } from "d3";
const bbox = [11.825, 53.7253321, -68.6255319, 7.2274985];

export default function () {
  return fetch("https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson")
    .then((res) => res.json())
    .then((data) => {
      data.bbox = bbox;
      // console.log(data);
      return data;
    });
}
