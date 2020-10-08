const mongoose = require('mongoose');
 
const Flight = new mongoose.Schema({
  FlightNo: {
    type: String
  },
  FlightName: {
    type: String
  },
  FlightSource: {
    type: String
  },
  FlightDestination: {
    type: String
  },
  FlightFare: {
    type: Number
  }
});
 
module.exports = airlineModel = mongoose.model('Flight', Flight);