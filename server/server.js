import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import testimonialRoutes from './routes/testimonials.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// Fix route naming consistency - remove trailing slash from auth
app.use('/api/auth', authRoutes); 
app.use('/api/testimonials', testimonialRoutes); // Add /api prefix

// Root route
app.get('/', (req, res) => {
  res.json({
    message: "TrueWord API is running",
    version: "1.0.0"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});