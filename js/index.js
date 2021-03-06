// Zoom map on specific town
import { zoomFunction } from "./modules/mapAndZoom.js";

// visualize sellingpoints on the map
import { showSellingpoint } from "./modules/sellingpoint.js";

// Fetching RDW Data
const endPoint = "https://opendata.rdw.nl/resource/cgqw-pfbp.json?$limit=100000";
getData(endPoint);

// Makes the connection with the api endpoint
async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  
  showSellingpoint(data);
}
