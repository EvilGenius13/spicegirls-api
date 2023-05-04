const User = require('../models/User');

const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.query.apiKey;
  if (!apiKey) {
    return res.status(401).json({ message: 'API key missing' });
  }

  const user = await User.findOne({ apiKey: apiKey });
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = user;
  next();
};

module.exports = apiKeyAuth;