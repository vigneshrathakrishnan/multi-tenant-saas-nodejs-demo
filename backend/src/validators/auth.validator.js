import {z} from "zod"

export const registerSchema = z.object({
    email: z.string().email('Invalid Email') ,
    password: z.string().min(6, 'The min password length should be 6')
})

export const loginSchema =  z.object({
    email: z.string().email('Invalid Email') ,
    password: z.string().min(6, 'The min password length should be 6')
})