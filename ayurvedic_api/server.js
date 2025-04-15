const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user-profile', require('./routes/profile'));
app.use('/api/solutions', require('./routes/solutions'));
app.use('/api/interactions', require('./routes/interactions'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/favorite', require('./routes/favorites'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/recommend', require('./routes/recommendations'));
app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));