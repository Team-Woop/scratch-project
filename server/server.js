const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017'

mongoose.connect(mongoURI);

const userController = require('./controllers/userControllers');
const workoutController = require('./controllers/workoutController');
const { fileURLToPath } = require('url');

app.use(express.json());
app.use(express.urlencoded());
app.use('/', express.static(path.resolve(__dirname, '../build')));

app.listen(3000);