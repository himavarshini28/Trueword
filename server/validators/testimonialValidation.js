import {z} from 'zod';

export const createTestimonialSchema=z.object({
    customerName:z 
    .string({
        required_error:"Customer name is required"
    })
    .min(2,"Name must be atleast 2 characters")  
    .max(100,"Name cannot exceed 100 characters") 
    .trim(), 
    customerEmail:z
    .string({
        required_error:"Customer email is required"
    })
    .email("Please provide a valid email address")  
    .toLowerCase(),

    customerCompany: z.
    string({
        required_error:"Customer email is required"
    })
    .email("Please provide a valid email address")  
    .toLowerCase(),

    customerCompany:z 
    .string()
    .max(100,"Company name cannot exceed 100 characters") 
    .trim()
    .optional(),

    message:z
    .string({
        required_error:"Testimonial message is required"  
    })
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters")
    .trim(),
 rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number"
    })
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")

})

export const updateStatusSchema = z.object({
    status: z.enum(['pending','approved','rejected'],
        {
            errorMap:()=>({message:"status must be pending, approved, or rejected"})
        }
    )
});