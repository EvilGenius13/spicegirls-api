const bcrypt = require('bcrypt');
const User = require('./models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

const userController = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const apiKey = generateApiKey();

      const user = new User({
        username,
        email,
        password: hashedPassword,
        apiKey,
      });

      await user.save();

      res.status(201).json({ message: 'User created successfully', apiKey });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userController;