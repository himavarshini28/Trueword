import express from "express";
import { validateRequest } from "../middleware/validation";
import Testimonial from "../models/Testimonial";
import { createTestimonialSchema,updateStatusSchema } from "../validators/testimonialValidation";

const router=router();

router.post('/',validateRequest(createTestimonialSchema),async(req,res,next)=>{
    try{
        const {userId} = req.query;
         if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required as query parameter'
      });
    }
    
    const testimonialData = {
      ...req.body,
      userId: userId
    };
    
    const testimonial = await Testimonial.create(testimonialData);
    
    console.log('New testimonial created for user:', userId);
          res.status(201).json({
      success: true,
      message: 'Thank you! Your testimonial has been submitted and is pending approval.',
      data: testimonial
    });
    
    }
    catch(error)
    {
        if(error.name==="ValidationError")
        {
            const messages=Object.values(error.errors).map(err=>err.message) 
            return res.status(400).json({
                success:false,
                message:"Validation failed",
                errors:messages
            });
        }
        res.status(500).json({
            success:false,
            message:"Error submitting testimonial"
        });


    }
});

router.get('/user/:userId',async(req,res)=>{
    try{
        const {userId}=req.params;
        const {status,featured}=req.query;

        const filter={userId};
        if(status) filter.status=status;
        if(featured!== undefined) filter.featured = featured==='true';

        const testimonials= await Testimonial.find(filter).sort({createdAt:-1}).populate('userId','name email');

        res.json({
            success:true,
            count:testimonials.length,
            data:testimonials
        });
    }
    catch(error)
    {
         console.log('Error fetching user testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials'
    });
    }
});

router.get('/public/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const testimonials = await Testimonial.find({ 
      userId, 
      status: 'approved' 
    })
    .sort({ featured: -1, createdAt: -1 })
    .select('-userId');
    
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
    
  } 
 catch (error) {
    console.log('Error fetching public testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials'
    });
  }
});

router.put('/:id/status', validateRequest(updateStatusSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
       }
    
    console.log(`Testimonial ${id} status updated to: ${status}`);
    
    res.json({
      success: true,
      message: `Testimonial ${status} successfully`,
      data: testimonial
    });
    
  } catch (error) {
    console.log('Error updating testimonial status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating testimonial status'
    });
  }
});

export default router;
