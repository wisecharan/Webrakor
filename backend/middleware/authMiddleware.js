const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization')?.split(' ')[1]; // Expects "Bearer <token>"

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admin; // Add admin payload to the request object
    next(); // Move to the next piece of middleware/route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};