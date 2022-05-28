const controller = {};
const apiKey = 'AIzaSyArkv_B14HtFM54IbcygLMLwVY3PGQYjRI';
const axios = require('axios');
const { string, number } = require('prop-types');


// const reqFormat = { origin : origin, 
//   destination : destination,
//   provideRouteAlternatives: false,
//   travelMode: 'DRIVING',
//   drivingOptions: {
//     departureTime: new Date(/* now, or future date */),
//     trafficModel: 'pessimistic'
//   },
//   unitSystem: google.maps.UnitSystem.IMPERIAL
// }
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyArkv_B14HtFM54IbcygLMLwVY3PGQYjRI
controller.parseDirections = async (req, res, next) => {

}
// distance.value given in meters 1 mile to 1609.34 meters

// async call to api to get the total distance and amount of 'steps' for the total trip
controller.getSteps = async (req, res, next) => {
  try{
    const getDirectionsResponse = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=${apiKey}`,)
    // console.log(getDirectionsResponse.data.routes.legs);
    // getDirectionsResponse.data.routes[0].legs[0].steps
    // total distance = getDirectionsResponse.data.routes[0].legs[0].distance.value ===> total distance
      // if totaldistance < their range, skip iterating through the steps and query for gas price nearby
        // (total tank - amount used) * cost at starting town
    res.locals.distance = getDirectionsResponse.data.routes[0].legs[0].distance.value; // <-- total in meters is .value, .text is miles
    res.locals.steps = getDirectionsResponse.data.routes[0].legs[0].steps; 
    next();
  } catch(err) {
    console.log('err in getlegs', err);
    next(err);
  };
};
//https://collectapi.com/api/gasPrice/gas-prices-api/fromCoordinates
//apikey 7LmvMeW15tjZluLdsMvY0S:08mM1ulDqUYhGmOyUjKk5X

// var options = {
//     "hostname": "api.collectapi.com",
//     "port": null,
//     "path": "/gasPrice/turkeyGasoline?district=kadikoy&city=istanbul",
//     "headers": {
//       "content-type": "application/json",
//       "authorization": "apikey 7LmvMeW15tjZluLdsMvY0S:08mM1ulDqUYhGmOyUjKk5X"
//     }
//   };
  
// res :
// {
//     success : boolean,
//     result: [
//         {
//             country : string,
//             gasoline : string,
//             currency : string,
//             diesel : string,
//             lpg : string
//         }
//     ]
// }
controller.getPrice = async(req, res, next) => {
    const fuelCap = 100000;
    const lng = res.locals.steps[0].start_location.lng
    const lat = res.locals.steps[0].start_location.lat
    console.log(lng, lat);
    // if the user is close to the destination
    if (res.locals.distance < fuelCap) {
      try{
        const getNearbyGas = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/?location=${lat}%2C${lng}&radius=1500&type=gas_station&key=${apiKey}`,);
        res.locals.gas = getNearbyGas;
        next();
        } 
      catch(err) {
        console.log('err in getlegs', err);
        next(err);
      }  
      //(fuelCap - res.locals.distance) * 
    }
    next();
}
module.exports = controller;
//  https://maps.googleapis.com/maps/api/directions/
//  json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyArkv_B14HtFM54IbcygLMLwVY3PGQYjRI


// input from user - start location, end location, miles-per-gallon, & tank capacity

  // API REQUEST #1 - Directions Api
  // send get request to directions API using start location and end location -->

    // --> result with array of steps each with distance between them (iterate through this to get total distance)
    // --> result also contains longitude and latitude of start/end location and each step

    //ayo ? my pc is frozen up what am i supposed to do uhhhhhhhhhhh 
    //fix my pc ---> yes :)
    
    // post req from client w body
    // form: {startLoc : {city:city, state:state}, destLoc : {city:city, state: state}, totalFuelCap: fuelCap}
      // form: {}
    // pass to google req controller, make request to google api with start and dest location, parse google result and 
    // pass along legs array

    // pass to gas 