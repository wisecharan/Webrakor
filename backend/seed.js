require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const MONGODB_URI = process.env.MONGO_URI;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME; // Read username from .env
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Read password from .env

const seedAdmin = async () => {
  try {
    // Check if credentials are provided in the .env file
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('Error: Please define ADMIN_USERNAME and ADMIN_PASSWORD in your .env file.');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected for seeding...');

    // Check if an admin with that username already exists
    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });
    if (existingAdmin) {
      console.log(`Admin user '${ADMIN_USERNAME}' already exists.`);
      mongoose.connection.close();
      return;
    }

    // Hash the password from the environment variable
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // Create new admin
    const admin = new Admin({
      username: ADMIN_USERNAME,
      password: hashedPassword,
    });

    await admin.save();
    console.log(`Admin user '${ADMIN_USERNAME}' created successfully!`);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();