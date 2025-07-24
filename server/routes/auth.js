import { validateRequest } from "../middleware/validation.js";
import { registerSchema,loginSchema } from "../validators/userValidation.js";
import express from 'express';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const router=express.Router();

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

router.post('/register',validateRequest(registerSchema),
async(req,res)=>{
    try{
        const {name,email,password,plan}=req.body;
         console.log('Creating user with validated data:', { name, email, plan });
         const existingUser=await User.findOne({email});
         if(existingUser)
         {
            return res.status(400).json({
                success:false,
                message:"User already exists with this email"
            });
         }
         const user=await User.create({name,email,password,plan});

         const token=generateToken(user._id);

         res.status(201).json({
            success:true,
            message:"USer registered successfully",
            token,
            user
         });
    }
    catch(error)
    {
         console.log('Registration error:', error);
         if(error.name==="ValidationError")
         {
           const messages = Object.values(error.errors).map(err => err.message);
           return res.status(400).json(
            {
                success:false,
                message:"Database validation failed",
                errors:messages,
            }
           );
         }

        if(error.code === 11000)
        {
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            });
        }
        res.status(500).json({
            success:false,
            message:'Server error during registration'
        });
    }
}
);

router.post('/login',validateRequest(loginSchema),async(req,res)=>{
    try{
        const {email,password}=req.body;
         console.log('Login attempt for:', email);
         const user= await User.findOne({email}).select('+password');
         if(!user || !user.matchPassword(password))
         {
            return res.status(401).json(
                {
                    success:false,
                    message:'Invalid email or Password'
                }
            );
         }

         const token= generateToken(user._id);

         console.log('Login successful for:', email);

         res.json({
      success: true,
      message: 'Login successful',
      token,
      user
         });

    }
    catch(error)
    {
         console.log('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
    }
});

export default router;