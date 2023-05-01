const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const apiKey = req.header('Authorization').replace('Bearer ', '');
    const user = await User.findOne({ apiKey });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;