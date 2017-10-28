const Geo = require('geo-nearby');

// const dataSet = [
//   { id: 1, name: 'Perth',     geoHash: 3149853951719405 },
//   { id: 2, name: 'Adelaide',  geoHash: 3243323516150966 },
//   { id: 3, name: 'Melbourne', geoHash: 3244523307653507 },
//   { id: 4, name: 'Canberra',  geoHash: 3251896081369449 },
//   { id: 5, name: 'Sydney',    geoHash: 3252342838034651 },
//   { id: 6, name: 'Brisbane',  geoHash: 3270013708086451 },
//   { id: 7, name: 'Sydney',    geoHash: 3252342838034651 }
// ];

// const geo = new Geo(dataSet, { hash: 'geoHash' });

// var result = geo.nearBy(-33.87, 151.2, 5000);
// console.log("Search Result :" + JSON.stringify(result));

// const data = [
//   { lat: -35.30278, lon: 149.14167, name: 'Canberra' },
//   { lat: -33.86944, lon: 151.20833, name: 'Sydney', data: 'Hello'},
//   { lat: -37.82056, lon: 144.96139, name: 'Melbourne' },
//   { lat: -34.93333, lon: 138.58333, name: 'Adelaide' },
//   { lat: -27.46778, lon: 153.02778, name: 'Brisbane' },
//   { lat: -31.95306, lon: 115.85889, name: 'Perth' }
// ];

// const geo = new Geo(data, { setOptions: { id: 'name', lat: 'lat', lon: 'lon' } });

// var result = geo.nearBy(-33.87, 151.2, 5000);
// console.log("Search Result :" + JSON.stringify(result));


const data = [
  [-35.30278, 149.14167, 'Canberra'],
  [-33.86944, 151.20833, {data:"demo",data2:"demo2"}],
  [-37.82056, 144.96139, 'Melbourne'],
  [-34.93333, 138.58333, 'Adelaide'],
  [-27.46778, 153.02778, 'Brisbane'],
  [-31.95306, 115.85889, 'Perth']
];

const dataSet = Geo.createCompactSet(data);
const geo = new Geo(dataSet, { sorted: true });

var result = geo.nearBy(-33.87, 151.2, 5000);
console.log("Search Result :" + JSON.stringify(result));
