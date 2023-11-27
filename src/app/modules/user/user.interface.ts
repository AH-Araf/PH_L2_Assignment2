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

export interface TOrder {
  productName: string;
  price: number;
  quantity: number;
}

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
  orders?: TOrder[];
};


//Instance
export type UserMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExist(userId: string): Promise<TUser | null>
}
export type UserModel = Model<
TUser, 
Record<string, never>, 
UserMethods
>;
