const controller = {};
const apiKey = 'AIzaSyArkv_B14HtFM54IbcygLMLwVY3PGQYjRI';
const axios = require('axios');
const { string, number } = require('prop-types');

controller.parseDirections = async (req, res, next) => {

}
// distance.value given in meters 1 mile to 1609.34 meters

// async call to api to get the total distance and amount of 'steps' for the total trip
controller.getSteps = async (req, res, next) => {
  //need to switch out placeholder values in get address 
  try{
    const getDirectionsResponse = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=Brooklyn&destination=Universal+Studios+Hollywood&key=${apiKey}`,);
    res.locals.distance = getDirectionsResponse.data.routes[0].legs[0].distance.value; // <-- total in meters is .value, .text is miles
    res.locals.steps = getDirectionsResponse.data.routes[0].legs[0].steps; 
    // returns array of steps and total distance
    next();
  } catch(err) {
    console.log('err in getSteps', err);
    next(err);
  };
};

const getState = async (lng, lat) => {
  // takes lat long and returns state code
  try {
    const getStateCode = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=administrative_area_level_1&key=${apiKey}`);
    // console.log('abc', getStateCode);
    // console.log('def', getStateCode.data.results);
    return getStateCode.data.results[0].address_components[0].short_name; // <-- 'NY'
  }
  catch(err) {
    console.log('err in getState', err);
    //next(err);
  };
};


controller.getPrice = async(req, res, next) => {
  // if distance is less than total cap, only take portion of gas used for calc
  // remember to switch out placeholders for items from front end
  const fuelCap = 1000;
  //const state = res.locals.state
  const mpgInMeters =  12754.32//req.body.mpg * 1609
  const initLng = -73.961452 
  const initLat = 40.714224
  const tankSize = 30;
  const miles = res.locals.distance / 1609

  if (miles < fuelCap) {
    try{
      const state = await getState(initLng, initLat);
      const getNearbyGas = await axios.get(`https://api.collectapi.com/gasPrice/stateUsaPrice?state=${state}`,
      {
        headers: {
          "content-type": "application/json",
          "authorization": "apikey 3ivMk5L2F6vHch8vw1FpgX:6kD8N80uhYUxvPao5LfgXy",
        }
      });
      gasPrice = Number(getNearbyGas.data.result.state.gasoline); // <--- gets average price of gas based on state code
      res.locals.totalPrice = ((res.locals.distance / mpgInMeters) / 1609) * gasPrice 
      
      next();
      }
      catch(err) {
      console.log('err in getNearbyGas in getPrice controller', err);
      next(err);
    };
  }
  // iterate through steps, subtract each step distance from runningFuelCap, when we hit 0 
  // go through gas price logic and reset runningFuelCap, repeat
  else {
    const fuelCapMeters = fuelCap * 1609.34;
    let runningCap = fuelCapMeters
    let totalPrice = 0;

    for (let i = 0; i < res.locals.steps.length; i++) {
      runningCap -= res.locals.steps[i].distance.value;
      if (runningCap <= 0) {
        nearbyState = await getState(res.locals.steps[i].start_location.lng, res.locals.steps[i].start_location.lat);
        getNearbyGas = await axios.get(`https://api.collectapi.com/gasPrice/stateUsaPrice?state=${nearbyState}`,
        {
          headers: {
            "content-type": "application/json",
            "authorization": "apikey 3ivMk5L2F6vHch8vw1FpgX:6kD8N80uhYUxvPao5LfgXy"
          }
        });
        totalPrice += Number(getNearbyGas.data.result.state.gasoline) * tankSize;
        console.log(Number(getNearbyGas.data.result.state.gasoline));
        runningCap = fuelCapMeters;
      };
    };
    res.locals.totalPrice = totalPrice;
    console.log('total price', totalPrice);
    next();
  };
};

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
