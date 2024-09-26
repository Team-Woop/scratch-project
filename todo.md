// iterate through steps, subtract each step distance from runningFuelCap, when we hit 0
// go through gas price logic and reset runningFuelCap, repeat
// else {
// const fuelCapMeters = fuelCap \* 1609.34;
// let runningCap = fuelCapMeters
// let totalPrice = 0;

// for (let i = 0; i < res.locals.steps.length; i++) {
// runningCap -= res.locals.steps[i].distance.value;
// if (runningCap <= 0) {
// nearbyState = await getState(res.locals.steps[i].start_location.lng, res.locals.steps[i].start_location.lat);
// getNearbyGas = await axios.get(`https://api.collectapi.com/gasPrice/stateUsaPrice?state=${nearbyState}`,
// {
// headers: {
// "content-type": "application/json",
// "authorization": "apikey 3ivMk5L2F6vHch8vw1FpgX:6kD8N80uhYUxvPao5LfgXy"
// }
// });
// totalPrice += Number(getNearbyGas.data.result.state.gasoline) \* tankSize;
// console.log(Number(getNearbyGas.data.result.state.gasoline));
// runningCap = fuelCapMeters;
// };
// };
// res.locals.totalPrice = totalPrice;
// console.log('total price', totalPrice);
// next();
// };
