"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("../user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const r = yield user_model_1.User.create(user);
    const result = Object.assign(Object.assign({}, r.toObject()), { password: undefined, orders: undefined, isDeleted: undefined });
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select({
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
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId }).select({ password: 0, isDeleted: 0, orders: 0 });
    if (!result) {
        throw new Error('User not found');
    }
    return result;
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateSingleUserToDB = (userId, updatedUserBodyDataInDB) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, updatedUserBodyDataInDB, { new: true, runValidators: true }).select({ password: 0, isDeleted: 0, orders: 0 });
    if (!result) {
        throw new Error('User not found');
    }
    return result;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ userId }, { isDeleted: true });
    if (result.modifiedCount > 0) {
        return {
            success: true,
            message: 'User deleted successfully!',
            data: null,
        };
    }
    else {
        return {
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        };
    }
});
const addOrdersToDB = (userId, addOrderDataInDB) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.User.findOneAndUpdate({ userId }, { $push: { orders: { $each: [addOrderDataInDB] } } }, { new: true, runValidators: true });
        if (!result) {
            throw new Error('User not found');
        }
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const getSingleUsersOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId }).select({ orders: 1 });
    if (!result) {
        throw new Error('User not found');
    }
    return result;
});
const getTotalPriceFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_model_1.User.findOne({ userId }).select({
            'orders.price': 1,
            'orders.quantity': 1,
        });
        if (!user) {
            throw new Error('User not found');
        }
        const totalPrice = ((_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.reduce((x, order) => x + order.price * order.quantity, 0)) || 0;
        return {
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice,
            },
        };
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        };
    }
});
exports.UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateSingleUserToDB,
    deleteUserFromDB,
    addOrdersToDB,
    getSingleUsersOrdersFromDB,
    getTotalPriceFromDB
};
