import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser, UserMethods, UserModel } from './user/user.interface';


const fullNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})
const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
})

const userSchema = new Schema<TUser, UserModel, UserMethods>({ //receiving instance value from user.interface.ts
    userId: { type: Number, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: {
        type: fullNameSchema,
    },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true, required: true },
    hobbies: { type: [String], required: true },
    address: {
        type: addressSchema,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required:false,
    },
})


//instance
userSchema.methods.isUserExist = async function (userId:string) {
    const existingUser = await User.findOne({userId})
    return existingUser;
}

export const User = model<TUser, UserModel>('User', userSchema); //mongo db collection name users. by default s added