import { Types } from 'mongoose';
import { UserType } from '@models/user.model';

export interface IUserAuth {
  email: string;
  password: string;
  role: UserType;
  userId: Types.ObjectId;
}
