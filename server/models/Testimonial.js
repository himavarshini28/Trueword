import mongoose from 'mongoose';

const testimonialSchema= mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User ID is required'],
        index:true,
    },

    customerName:{
        type:String,
        required:[true,"Customer name is required"],
        trim:true,
        minLength: [2, 'Name must be at least 2 characters'],
    maxLength: [100, 'Name cannot exceed 100 characters']
    },
     customerEmail: {
    type: String,
    required: [true, 'Customer email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
   customerCompany: {
    type: String,
    trim: true,
    maxLength: [100, 'Company name cannot exceed 100 characters']
  },
    message: {
    type: String,
    required: [true, 'Testimonial message is required'],
    trim: true,
    minLength: [10, 'Message must be at least 10 characters'],
    maxLength: [1000, 'Message cannot exceed 1000 characters']
  },
   rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be a whole number'
    }
  },
   status: {
    type: String,
    enum: {
      values: ['pending', 'approved', 'rejected'],
      message: 'Status must be pending, approved, or rejected'
    },
    default: 'pending'
  },
  featured: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
}
);

testimonialSchema.index({userId:1,status:1});
testimonialSchema.index({userId:1,featured:1});

export default mongoose.model('Testmonial',testimonialSchema);