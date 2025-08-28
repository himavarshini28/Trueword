import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import testimonialRoutes from './routes/testimonials.js';
import cors from 'cors';
dotenv.config();
connectDB();

const app=express();
app.use(cors({
  origin: [
    'https://trueword-e4vi.vercel.app/api',
    'https://trueword-e4vi-blat34spz-himavarshinis-projects.vercel.app', 
    'http://localhost:5173' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth/', authRoutes);
app.use('/testimonials', testimonialRoutes);

app.get('/',(req,res)=>
{
  res.json(
    {
      message:"trueword is running",
    }
  )
})

app.listen(process.env.PORT || 5000,()=>{
  console.log("server is running");
})