const controller = {};
const apiKey = "AIzaSyArkv_B14HtFM54IbcygLMLwVY3PGQYjRI";
const axios = require("axios");
const { string, number } = require("prop-types");
const fs = require("fs/promises");
const path = require("path");
const { now } = require("mongoose");
const { nextTick } = require("process");

controller.parseDirections = async (req, res, next) => { };
// distance.value given in meters 1 mile to 1609.34 meters

// async call to api to get the total distance and amount of 'steps' for the total trip
controller.getSteps = async (req, res, next) => {
  const { originCity, destinationCity, originState, destinationState, mpg } =
    req.query;
  try {
    const getDirectionsResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originCity}+%2C%20+${originState}&destination=${destinationCity}+%2C%20+${destinationState}&key=${apiKey}`
    );
    res.locals.distance =
      getDirectionsResponse.data.routes[0].legs[0].distance.text; // <-- total in meters is .value, .text is miles
    // res.locals.steps = getDirectionsResponse.data.routes[0].legs[0].steps;
    //console.log('distance', res.locals.distance);
    res.locals.mpg = mpg;
    res.locals.originState = originState;
    // returns array of steps and total distance
    return next();
  } catch (err) {
    console.log("err in getSteps", err);
    next(err);
  }
};

// const getState = async (lng, lat, next) => {
//   // takes lat long and returns state code
//   try {
//     const getStateCode = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=administrative_area_level_1&key=${apiKey}`
//     );
//     return getStateCode.data.results[0].address_components[0].short_name; // <-- e.g.,'NY'
//   } catch (err) {
//     next(err);
//   }
// };

controller.refreshPrices = async () => {
  const SUCCESS_CACHED_DATA = -1;
  const SUCCESS_REFRESH_DATA = 1;
  const FAIL_ERR = -2;

  try {
    // Fetch the date of the last time data was refreshed
    let checkLastRefreshDate = await fs.readFile(
      path.join(__dirname, "../models/tinyDb.json"),
      "utf-8"
    );
    let parsedRefreshDate = JSON.parse(checkLastRefreshDate);
    let lastUpdated = await parsedRefreshDate.lastUpdated;

    // Setting variables for the date on this function call and a date which represents the latest an API call can have been made previously
    const today = new Date();
    const todayLessThree = new Date().setDate(today.getDate() - 3);

    // Declaring some variables in outer execution context for ease of reference in other functions
    let gasPricesUSA;
    const stateGasPrices = {
      lastUpdated: today,
      stateGasPrices: {},
    };

    // Validate that 3 days have passed since the last fetch so as to be respectful of the API rate limit
    // return value of -1 will represent that things are functioning, but it is not time to make another call
    if (Date.parse(await lastUpdated) > todayLessThree)
      return SUCCESS_CACHED_DATA;
    else {
      gasPricesUSA = await axios.get(
        "https://api.collectapi.com/gasPrice/allUsaPrice",
        {
          headers: {
            "content-type": "application/json",
            authorization:
              "apikey 5bwVFhyTRby5HMfdnOrPUr:3IEvZDddbEjTGlcAGJiMcK",
          },
        }
      );

      // Declare and initialize object which helps convert State name (long) from API to State name (short) which comes from front end
      const stateConv = {
        Alabama: "AL",
        Alaska: "AK",
        Arizona: "AZ",
        Arkansas: "AR",
        California: "CA",
        Colorado: "CO",
        Connecticut: "CT",
        Delaware: "DE",
        Florida: "FL",
        Georgia: "GA",
        Hawaii: "HI",
        Idaho: "ID",
        Illinois: "IL",
        Indiana: "IN",
        Iowa: "IA",
        Kansas: "KS",
        Kentucky: "KY",
        Louisiana: "LA",
        Maine: "ME",
        Maryland: "MD",
        Massachusetts: "MA",
        Michigan: "MI",
        Minnesota: "MN",
        Mississippi: "MS",
        Missouri: "MO",
        Montana: "MT",
        Nebraska: "NE",
        Nevada: "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        Ohio: "OH",
        Oklahoma: "OK",
        Oregon: "OR",
        Pennsylvania: "PA",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        Tennessee: "TN",
        Texas: "TX",
        Utah: "UT",
        Vermont: "VT",
        Virginia: "VA",
        Washington: "WA",
        "West Virginia": "WV",
        Wisconsin: "WI",
        Wyoming: "WY",
      };

      // Fill an object with the gasPrice API objects (with state names and gas prices) organized by 2-letter state name
      const tmpGasPriceObj = await {};
      for (let i = 0; i < (await gasPricesUSA.data.result.length); i++) {
        stateGasPrices.stateGasPrices[
          stateConv[await gasPricesUSA.data.result[i].name]
        ] = gasPricesUSA.data.result[i];
        console.log(tmpGasPriceObj);
      }
    }

    // write the new object with state 2-letter names and gasPrice objects to tinyDb locally on the server
    fs.writeFile(
      path.join(__dirname, "../models/tinyDb.json"),
      JSON.stringify(await stateGasPrices),
      "utf-8"
    );

    // return value of 1 to show that the new information was pulled successfully;
    return SUCCESS_REFRESH_DATA;
  } catch (err) {
    // if error, log to the console
    console.log("There was an error in the refreshPrices function: ", err);

    // return -2 to show that there was an error running this function
    return FAIL_ERR;
  }
};

// Console logs for the refreshPrices function to test
// const testVal = controller.refreshPrices()
//   .then(res => console.log(res));

controller.getPrice = async (req, res, next) => {
  // FROM FRONT-END: MPG, START STATE
  // FROM RES.LOCALS: DISTANCE
  // API REQ: GET PRICE/GAL BASED ON STATE
  // ----> CALCULATE: DISTANCE/MPG * PRICE/GAL

  const refreshGasPricesStatusCode = await controller.refreshPrices();

  const { mpg, originState, distance } = res.locals;

  const distanceNum = Number(distance.match(/[0-9]/gm).join(""));

  try {
    // const state = await getState(initLng, initLat);
    // Read-in the gasPrices object from tinyDb on local storage
    let gasPriceObj = await fs.readFile(
      path.join(__dirname, "../models/tinyDb.json"),
      "utf-8"
    );

    // parse gas prices object retrieved from tinyDb
    let gasPriceParsed = JSON.parse(await gasPriceObj);
    let gasPrice = await gasPriceParsed.stateGasPrices[originState].gasoline;

    // console.log('gasPrice', await gasPrice);
    // ----> CALCULATE: DISTANCE/MPG * PRICE/GAL
    res.locals.totalPrice = (distanceNum / Number(mpg)) * (await gasPrice);
    // console.log('totalPrice', await res.locals.totalPrice);

    return next();
  } catch (err) {
    console.log("err in getNearbyGas in getPrice controller", err);
    next(err);
  }
};

module.exports = controller;
