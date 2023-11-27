import { Model } from "mongoose";

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  isDeleted?: boolean;
};


//Instance
export type UserMethods = {
  isUserExist(userId: string): Promise<TUser>
}
export type UserModel = Model<
TUser, 
Record<string, never>, 
UserMethods
>;
