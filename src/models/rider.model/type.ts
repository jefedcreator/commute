import { IUser } from '@models/user.model';

export interface IRider extends IUser {
  carNumber: string;
  carModel: string;
  rating: number;
}
