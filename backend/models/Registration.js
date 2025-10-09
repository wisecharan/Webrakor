const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  // New Fields
  contactNo: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  courseSpecialization: { // Optional field
    type: String,
    required: true,
  },
  yearOfStudy: {
    type: String,
    required: true,
  },
  howDidYouHear: {
    type: String,
    required: true,
    enum: ['Social Media', 'College', 'Friend', 'Other'], // Example options
  },
  // ---
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Registration', RegistrationSchema);