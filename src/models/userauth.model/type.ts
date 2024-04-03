import { Types, Document } from 'mongoose';
import { UserType } from '@models/user.model';

export interface IUserAuth extends Document {
  email: string;
  password: string;
  role: UserType;
  isActive: boolean;
  userId: Types.ObjectId;
}
