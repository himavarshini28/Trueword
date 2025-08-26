import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            unique:true,
            required:[true,'Please provide a name'],
            trim:true,
            minLength:[2,'Username must me more than two characters'],
            maxLength:[50,'Username cannot be more than 20 characters']
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            match:[
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
            ]
        },
        password:{
            type:String,
            required:[true,'Please provide a password'],
            trim:true,
            select:false,
            minLength:[6,'Password must be at least 6 characters'],
        },
        title:{
            type:String,
            minLength:2,
            maxLength:60,
            default: 'developer',
        },
        company:{
            type:String,    
            maxLength:60,
            default:'Trueword',
        },
        plan:
        {
            type:String,
            enum:{
                values:['free','pro','enterprise'],
                message:'Plan must be either free, pro, or enterprise'
            },
            default:'free',
        }
    },
    {
        timestamps:true
    }
);

UserSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

UserSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

UserSchema.methods.genjwt= async function()
{
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET
    );
};

export default mongoose.model('User',UserSchema);

