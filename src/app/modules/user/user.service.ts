import { UserModel } from "../user.model";
import { User } from "./user.interface";

const createUserIntoDB = async (user: User) => {
    const r = await UserModel.create(user);
    const result = { ...r.toObject(), password: undefined };
    return result;
}

const getAllUsersFromDB = async () => {
    const result = await UserModel.find().select({
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
    const result = await UserModel.findOne({ userId }).select('-password');
    if (!result) {
        throw new Error('User not found');
    }
    return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSingleUserToDB = async (userId: string, updatedUserBodyDataInDB: any) => {
    const result = await UserModel.findOneAndUpdate({ userId }, updatedUserBodyDataInDB, { new: true, runValidators: true }).select('-password');
    if (!result) {
        throw new Error('User not found');
    }
    return result;
}

const deleteUserFromDB = async (userId: string) => {
    const result = await UserModel.updateOne({ userId }, { isDeleted: true });
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

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateSingleUserToDB,
    deleteUserFromDB,
}