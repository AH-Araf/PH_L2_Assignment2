import { z } from 'zod';

const fullNameSchema = z.object({
    firstName: z.string().min(1).max(20).refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
    lastName: z.string(),
  });
  
  const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  });
  
  const userValidationSchema = z.object({
    userId: z.number().int().positive(),
    username: z.string(),
    password: z.string(),
    fullName: fullNameSchema,
    age: z.number().int().positive(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: addressSchema,
    isDeleted: z.boolean().optional(),
  });

export default  userValidationSchema ;


