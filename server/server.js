const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017'
// mongodb+srv://JHauanio:<password>@cluster0.sqhld.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(mongoURI);

const controller = require('./controllers/controller.js');
const { fileURLToPath } = require('url');

app.use(express.json());
// app.use(express.urlencoded());

app.use('/', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});
// join styles.css page
app.get('/client/styles.css', (req, res) => {
  res.status(200).setHeader('content-type', 'text/css').sendFile(path.join(__dirname, '../client/styles.css'));
});

// receive input from client in format: 
// {startLoc : {city:city, state:state}, destLoc : {city:city, state: state}, totalFuelCap: fuelCap}
// returns in format: {Distance : Distance, Cost : Cost}

//  https://maps.googleapis.com/maps/api/geocode/
//  json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyArkv_B14HtFM54IbcygLMLwVY3PGQYjRI
app.get('/submit', controller.getSteps, controller.getPrice, (req, res) => {
  res.send(res.locals.totalPrice);
})

// request to google directions api for legs
app.get('')


// global error handler - only invoked when next passes in an arg
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 400,
    message: { err: `An error occurred` }
  };
  console.log(defaultErr, err);
  const errorObj = Object.assign(defaultErr, err);
  console.log(JSON.stringify(errorObj.log));
  return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

app.listen(3000);