const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  position_x: Number,
  position_y: Number,
  vilan: Boolean,
  etat : Number

});
const City = mongoose.model('City', citySchema);

module.exports = {
  City
};