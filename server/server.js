import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

dotenv.config();
connectDB();

const app=express();
app.use(express.json());

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