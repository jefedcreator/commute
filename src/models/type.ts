import { Types } from 'mongoose';

export enum UserType {
  USER = 'USER',
  PROFESSIONAL = 'PROFESSIONAL',
  ADMIN = 'ADMIN',
}
export interface IUserAuth {
  email: string;
  hash: string;
  role: UserType;
  userId: Types.ObjectId;
}
