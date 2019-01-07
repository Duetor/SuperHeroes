#!/usr/bin/env node

const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const port = 3030;
require('dotenv').config();
const dbURL = process.env.DB || 'mongodb://hero:0hero!@ds149914.mlab.com:49914/superhero_library';
mongoose.connect(dbURL, {useNewUrlParser: true}, function(err) {
  console.log('Successfully connected to MongoDB');
});

mongoose.Promise = global.Promise;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);
console.log(`server runnig on port ${port} : http://localhost:${port}/`);
