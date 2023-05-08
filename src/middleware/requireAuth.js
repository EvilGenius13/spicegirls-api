const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(req.headers)
    // If no token in header, check for token in cookie
    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = requireAuth;