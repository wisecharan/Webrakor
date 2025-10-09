const Registration = require('../models/Registration');

exports.createRegistration = async (req, res) => {
  try {
    const {
      name,
      email,
      contactNo,
      collegeName,
      courseSpecialization,
      yearOfStudy,
      howDidYouHear,
    } = req.body;

    // More comprehensive validation
    if (!name || !email || !contactNo || !collegeName || !courseSpecialization || !yearOfStudy || !howDidYouHear) {
      return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    const existingUser = await Registration.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'This email is already registered.' });
    }

    const newRegistration = new Registration({
      name,
      email,
      contactNo,
      collegeName,
      courseSpecialization, // Will be undefined if not provided, which is fine
      yearOfStudy,
      howDidYouHear,
    });

    await newRegistration.save();

    res.status(201).json({ msg: 'Registration successful!', registration: newRegistration });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};