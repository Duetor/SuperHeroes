const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const montureSchema = new Schema({
  name : String,
  state: String,
  energie: Number,
  master: String,
  savage:Boolean,
  etat : Number

});
const Monture = mongoose.model('Monture', montureSchema);

module.exports = {
  Monture
};