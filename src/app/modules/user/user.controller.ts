import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";

//create new user
const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        const ZODParseData = userValidationSchema.parse(userData);


        const result = await UserServices.createUserIntoDB(ZODParseData);

        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        })
    } catch (error) {
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
}

//get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUsersFromDB()
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        })
    } catch (error) {
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
}

//get single users
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await UserServices.getSingleUserFromDB(userId);

        if (result !== null && result !== undefined) {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: result,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }

    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!",
            }
        });
    }
}



//update user
const updateUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const updatedUserBodyDataInDB = req.body;
      const updatedUser = await UserServices.updateSingleUserToDB(userId, updatedUserBodyDataInDB);
  
      if (updatedUser !== null) {
        res.status(200).json({
          success: true,
          message: 'User updated successfully!',
          data: updatedUser,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        });
      }
    
    } catch (error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  };


//deleteUser
  const deleteUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const result = await UserServices.deleteUserFromDB(userId);
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(404).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
  };




export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}