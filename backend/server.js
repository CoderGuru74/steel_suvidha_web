const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const blogRoutes = require('./routes/blogRoutes');
const Price = require('./models/Price');
const User = require('./models/User');
const Video = require('./models/Video');

dotenv.config();

const app = express();
const server = http.createServer(app);

// 1. Socket.io Configuration
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// 2. Default Seed Data Matrix
const defaultPrices = [
  { item: "Steel TMT Rebars (Fe 550D)", price: 58500, change: 0.8, up: true },
  { item: "ISMC Channels", price: 54200, change: -0.4, up: false },
  { item: "Structural Angles (MS/GI)", price: 51200, change: 1.1, up: true },
  { item: "Commercial Iron Flats", price: 49800, change: -0.2, up: false },
  { item: "ISMB Structural Joists", price: 56400, change: 0.5, up: true },
  { item: "HR / CR Steel Sheets", price: 65200, change: 0.3, up: true },
  { item: "Color Profile Roofing Sheets", price: 73500, change: -0.6, up: false }
];

const defaultVideos = [
  { title: 'Automated Rolling Mills', subtitle: 'Verified Infrastructure Ledger Node Log', videoUrl: 'https://www.youtube.com/embed/8-S_OaJ5s28', duration: '05:12' },
  { title: 'Structural Failure Diagnostics', subtitle: 'Verified Infrastructure Ledger Node Log', videoUrl: 'https://www.youtube.com/embed/S_8qM7u-v0U', duration: '03:45' }
];

// Seed Function to Populate MongoDB Collections
async function seedDatabase() {
  try {
    // A. Seed Prices Collection if empty
    const priceCount = await Price.countDocuments();
    if (priceCount === 0) {
      await Price.insertMany(defaultPrices);
      console.log('📌 Default steel price matrix seeded into MongoDB.');
    }

    // B. Seed Video Gallery if empty
    const videoCount = await Video.countDocuments();
    if (videoCount === 0) {
      await Video.insertMany(defaultVideos);
      console.log('📌 Default video gallery seeded into MongoDB.');
    }

    // C. Create / Update Secure Admin User in MongoDB
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'suvidha_admin_2026';
    const hashedPassword = await bcrypt.hash(adminPass, 10);

    await User.findOneAndUpdate(
      { username: adminUser },
      { username: adminUser, password: hashedPassword },
      { upsert: true, returnDocument: 'after' }
    );
    
    // Clean log with no sensitive credentials
    console.log('🔐 System Security Framework: Admin credentials initialized and active.');

  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
}

// 3. Authentication Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const targetUser = username || process.env.ADMIN_USERNAME || 'admin';
    
    const user = await User.findOne({ username: targetUser });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({ success: true, message: "Authentication Successful" });
  } catch (err) {
    res.status(500).json({ message: "Authentication Error", err });
  }
});

// 4. API Routes
app.use('/api/blogs', blogRoutes);

// GET & PUT: Prices API
app.get('/api/prices', async (req, res) => {
  try {
    const prices = await Price.find();
    res.status(200).json(prices);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch prices", err });
  }
});

app.put('/api/prices', async (req, res) => {
  try {
    const { item, price, change, up } = req.body;

    if (!item || price === undefined) {
      return res.status(400).json({ message: "Item name and price are required." });
    }

    const updatedDoc = await Price.findOneAndUpdate(
      { item },
      { 
        price: Number(price), 
        change: Number(change || 0), 
        up: Boolean(up), 
        updatedAt: new Date() 
      },
      { returnDocument: 'after', upsert: true }
    );

    const allPrices = await Price.find();
    io.emit('priceUpdate', allPrices);

    res.status(200).json({ message: "Price updated successfully", doc: updatedDoc });
  } catch (err) {
    res.status(500).json({ message: "Failed to update price", err });
  }
});

// GET, POST, DELETE: Videos API
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", err });
  }
});

app.post('/api/videos', async (req, res) => {
  try {
    const { title, subtitle, videoUrl, duration } = req.body;
    if (!title || !videoUrl) return res.status(400).json({ message: "Title and video URL are required." });

    const newVideo = await Video.create({ title, subtitle, videoUrl, duration });
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: "Failed to upload video", err });
  }
});

app.delete('/api/videos/:id', async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete video", err });
  }
});

// 5. WebSocket Connection Lifecycle
io.on('connection', async (socket) => {
  console.log('⚡ Client connected to ticker stream:', socket.id);

  try {
    const currentPrices = await Price.find();
    socket.emit('priceUpdate', currentPrices);
  } catch (err) {
    console.error('Error streaming initial prices:', err);
  }

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Database Connection & Server Startup
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/steel_suvidha';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('🍃 DB Framework Engine Operational: Connected to MongoDB');
    await seedDatabase();
  })
  .catch(err => console.error('🔥 MongoDB Database Connection Aborted:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Steel Suvidha Core Backend running on port ${PORT}`));