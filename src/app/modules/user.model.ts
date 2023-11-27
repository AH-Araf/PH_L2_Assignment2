import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser, UserMethods, UserModel } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})
const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
})

const ordersSchema = new Schema<TOrder>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const userSchema = new Schema<TUser, UserModel, UserMethods>({ //receiving instance value from user.interface.ts
    userId: { type: Number, unique:true, required: true},
    username: { type: String, unique:true, required: true},
    password: { type: String, required: true },
    fullName: {
        type: fullNameSchema,
    },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique:true },
    isActive: { type: Boolean, default: true, required: true },
    hobbies: { type: [String], required: true },
    address: {
        type: addressSchema,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: false,
    },
    orders: [{
        type: ordersSchema,
        required: false,
    }],
},
)


//pre hook for hashing password
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});
//post hook to show empty password in DB
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});


//Query middleware for hide deleted data //without deleting data seems like deleted
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

//instance
userSchema.methods.isUserExist = async function (userId: string) {
    const existingUser = await User.findOne({ userId })
    return existingUser;
}

export const User = model<TUser, UserModel>('User', userSchema); //mongo db collection name users. by default s added