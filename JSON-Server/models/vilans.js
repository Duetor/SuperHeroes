const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vilanSchema = new Schema({
  name: String,
  hp: Number,
  damage: Number,
  city: String,
  reward: Number,
  etat : Number
});
const Vilan = mongoose.model('Vilan', vilanSchema);

module.exports = {
  Vilan
};