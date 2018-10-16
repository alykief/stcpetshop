//Require Mongoose
const mongoose = require('mongoose');
//Blueprint
const petSchema = mongoose.Schema({
  species: { type: String, required: true },
  breed: String,
  img: String,
  readyToGo: Boolean,
  price: { type: Number, default: 0 },
  qty: { type: Number, default: 0 },
  rating: Number
});
//Name variable
const Pet = mongoose.model('Pet', petSchema);
//Export new addition
module.exports = Pet;
