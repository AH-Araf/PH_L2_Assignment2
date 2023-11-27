"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fullNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20).refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }),
    lastName: zod_1.z.string(),
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const OrderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: fullNameSchema,
    age: zod_1.z.number().int().positive(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressSchema,
    isDeleted: zod_1.z.boolean().optional(),
    orders: zod_1.z.array(OrderSchema).optional(),
});
exports.default = userValidationSchema;
