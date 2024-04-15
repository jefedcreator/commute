import { Document } from 'mongoose';

export enum Gender {
  male = 'male',
  female = 'female',
}

export enum UserType {
  user = 'user',
  rider = 'rider',
}

export interface IUser extends Document {
  email: string;
  firstname: string;
  lastname: string;
  gender: Gender;
  phone: string;
  avatar: string;
  campus: string;
  walletInfo: {
    currentAmount: number;
  };
  role: UserType;
  totalPayments: number;
  totalRides: number;
}
