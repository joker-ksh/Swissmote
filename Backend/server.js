const express = require('express');
const http = require("http");
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/event');
dotenv.config();

const app = express();
const server = http.createServer(app);


// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://splendorous-pony-21a6e0.netlify.app/',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);



// Start the server
server.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port ' + process.env.PORT);
});
