const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const baseSchema = new Schema({
  name:String,
  position_x: Number,
  position_y: Number,
  licorn: Number,
  poney: Number,
  money: Number,
  heroList: Boolean,
  etat : Number

});
const Base = mongoose.model('Base', baseSchema);

module.exports = {
  Base
};