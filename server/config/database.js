import mongoose from 'mongoose';

const connectDB=async()=>{

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected");
    }
    catch(error)
    {
        console.log("Dtabase connection failed",error);
        process.exit(1);
    }
};

export default connectDB;