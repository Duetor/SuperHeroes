const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const heroSchema = new Schema({
  name: String,
  hp: Number,
  damage: Number,
  position_x: Number,
  position_y: Number,
  mount: String,
  cost: Number,
  service: Boolean,
  etat : Number

});
const Hero = mongoose.model('Hero', heroSchema);

module.exports = {
  Hero
};