const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017'
// mongodb+srv://JHauanio:<password>@cluster0.sqhld.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(mongoURI);

const { fileURLToPath } = require('url');

app.use(express.json());
// app.use(express.urlencoded());

app.use('/', express.static(path.resolve(__dirname, '../build')));

// join styles.css page
app.get('/client/styles.css', (req, res) => {
  res.status(200).setHeader('content-type', 'text/css').sendFile(path.join(__dirname, '../client/styles.css'));
});

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