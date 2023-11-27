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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
//create new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const ZODParseData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.UserServices.createUserIntoDB(ZODParseData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not created",
            "error": {
                "code": 404,
                "description": "User not created!",
                "error": error,
            }
        });
    }
});
//get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "Users not found",
            "error": {
                "code": 404,
                "description": "Users not found!",
                "error": error,
            }
        });
    }
});
//get single users
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
        if (result !== null && result !== undefined) {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!",
            }
        });
    }
});
//update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedUserBodyDataInDB = req.body;
        const result = yield user_service_1.UserServices.updateSingleUserToDB(userId, updatedUserBodyDataInDB);
        if (result !== null) {
            res.status(200).json({
                success: true,
                message: 'User updated successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
//deleteUser
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.deleteUserFromDB(userId);
        res.status(result.success ? 200 : 404).json(result);
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
//add order in orders filed
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { productName, price, quantity } = req.body;
        const addOrderDataInDBa = { productName, price, quantity };
        const result = yield user_service_1.UserServices.addOrdersToDB(userId, addOrderDataInDBa);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Order added successfully!',
                data: null,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
//get single users order
const getSingleUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUsersOrdersFromDB(userId);
        if (result !== null && result !== undefined) {
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!",
            }
        });
    }
});
//Total Price
const TotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getTotalPriceFromDB(userId);
        res.status(result.success ? 200 : 404).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found!',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getSingleUserOrder,
    TotalPrice,
};
