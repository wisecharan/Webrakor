require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173', // Your frontend development server
  // 'https://your-deployed-site.com' // Add your production URL here later
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
})); // Allows cross-origin requests
app.use(express.json()); // Allows parsing of JSON in request body

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'UP', 
    timestamp: new Date().toISOString() 
  });
});


app.use('/api/register', require('./routes/register'));
app.use('/api/admin', require('./routes/admin')); // Add this line
// ...



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


// Basic Route
app.get('/', (req, res) => {
  res.send('Workshop Registration API is running!');
});

// We will add our API routes here later

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});