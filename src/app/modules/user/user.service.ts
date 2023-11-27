import { User } from "../user.model";
import { TUser } from "./user.interface";
type AddOrderData = {
    productName: string;
    price: number;
    quantity: number;
};

const createUserIntoDB = async (user: TUser) => {
    const r = await User.create(user);
    const result = { ...r.toObject(), password: undefined, orders: undefined, isDeleted: undefined };
    return result;
}

const getAllUsersFromDB = async () => {
    const result = await User.find().select({
        username: 1,
        'fullName.firstName': 1,
        'fullName.lastName': 1,
        age: 1,
        email: 1,
        'address.street': 1,
        'address.city': 1,
        'address.country': 1,
        _id: 0,

    });
    return result;
}
const getSingleUserFromDB = async (userId: string) => {
    const result = await User.findOne({ userId }).select({password:0, isDeleted:0, orders:0});
    if (!result) {
        throw new Error('User not found');
    }
    return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSingleUserToDB = async (userId: string, updatedUserBodyDataInDB: any) => {
    const result = await User.findOneAndUpdate({ userId }, updatedUserBodyDataInDB, { new: true, runValidators: true }).select({password:0, isDeleted:0, orders:0});
    if (!result) {
        throw new Error('User not found');
    }
    return result;
}

const deleteUserFromDB = async (userId: string) => {
    const result = await User.updateOne({ userId }, { isDeleted: true });
    if (result.modifiedCount > 0) {
        return {
            success: true,
            message: 'User deleted successfully!',
            data: null,
        };
    } else {
        return {
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        };
    }
};


const addOrdersToDB = async (userId: string, addOrderDataInDB: AddOrderData) => {
    try{
        const result = await User.findOneAndUpdate({userId},{ $push: { orders: { $each: [addOrderDataInDB] } } },{ new: true, runValidators: true });
        if (!result) {
            throw new Error('User not found');
        }
        return result;
    }catch(error){
        console.log(error);
    }
}

const getSingleUsersOrdersFromDB = async (userId: string) => {
    const result = await User.findOne({ userId }).select({orders:1});
    if (!result) {
        throw new Error('User not found');
    }
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateSingleUserToDB,
    deleteUserFromDB,
    addOrdersToDB,
    getSingleUsersOrdersFromDB
}