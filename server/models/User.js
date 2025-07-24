import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Please provide a name'],
            trim:true,
            minLength:[2,'Name must me more than two characters'],
            maxLength:[50,'Name cannot be more than 20 characters']
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

export default mongoose.model('User',UserSchema);

