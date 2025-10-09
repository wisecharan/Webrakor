const express = require('express');
const router = express.Router();
const { loginAdmin, getRegistrations } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route for admin login
router.post('/login', loginAdmin);

// Private route to get all registrations
// The authMiddleware will run first. If the token is valid, it will call getRegistrations.
router.get('/registrations', authMiddleware, getRegistrations);

module.exports = router;