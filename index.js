import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB connection URI from .env
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.warn('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Simple route
app.get('/', (req, res) => {
  res.json({data:{message:'Hello, MongoDB Atlas connected!'}});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
