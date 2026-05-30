const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Integration Paths
app.use('/api/blogs', blogRoutes);

// Establish MongoDB Connection Pipeline
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🍃 DB Framework Engine Operational: Connected to MongoDB'))
  .catch(err => console.error('🔥 MongoDB Database Connection Aborted:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Steel Suvidha Core Backend running on port ${PORT}`));