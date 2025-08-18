import {z} from 'zod';

export const registerSchema= z.object(
    {
        username: z.string({
            required_error:"Name is required",
            invalid_type_error:"Name must be a string"
        })
        .min(2,"Name must be atleast 2 characters")
        .max(50,"Name cannot exceed 50 characaters")
        .trim()
        .refine(
            (val)=> val.length>0,
            "Name cannot be empty"
        ),
         email: z
    .string({
      required_error: "Email is required"
    })
    .email("Please provide a valid email address")
    .toLowerCase()
    .refine(
      (val) => !val.includes('+'),
      "Email addresses with '+' symbols are not allowed"
    ),
    password:z.string(
        {
            required_error:"password is required"
        }
    )
    .min(8,"Password must be atleast 8 characters")
    .max(50,"Password cannot be exceed 50 characters")
    .refine(
        (val)=>/[A-Z]/.test(val),
        "Password must contain at least one uppercase letter"
    )
     .refine(
      (val) => /[a-z]/.test(val),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (val) => /\d/.test(val),
      "Password must contain at least one number"
    ),
    plan:z.enum(["free","pro","enterprise"])
    .optional()
    .default("free"),
    company: z.string()
    .min(8)
    .max(50)
    .optional(),
    title:z.string().optional(),

    }
);


export const loginSchema= z.object(
    {
        email: z
    .string({
      required_error: "Email is required"
    })
    .email("Please provide a valid email address"),
    password:z.string(
        {
            required_error:"password is required"
        }
    )
    .min(1,"Password cannot be empty")
    
}
);

