const RouteVisit = require('../models/RouteVisit');

// Middleware for tracking route visits
const trackRouteVisit = async (req, res, next) => {
  try {
    const route = req.originalUrl; // Use the full URL including query parameters
    const visit = await RouteVisit.findOne({ route });

    if (visit) {
      visit.count++;
      await visit.save();
    } else {
      await RouteVisit.create({ route });
    }

    next();
  } catch (err) {
    console.error(err);
    next();
  }
};

module.exports = trackRouteVisit;