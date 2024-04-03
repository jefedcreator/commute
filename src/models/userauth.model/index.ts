import { UserType } from '@models/user.model';
import { Schema, model } from 'mongoose';
import { IUserAuth } from './type';

export const UserAuthSchema = new Schema<IUserAuth>(
  {
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: Object.keys(UserType),
      default: UserType.user,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const UserAuth = model<IUserAuth>('UserAuth', UserAuthSchema);
export * from './type';
export default UserAuth;
