const mongoose = require('mongoose');

const RouteVisitSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const RouteVisit = mongoose.model('RouteVisit', RouteVisitSchema);

module.exports = RouteVisit;