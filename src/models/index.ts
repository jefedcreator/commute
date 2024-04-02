import { Schema, model } from 'mongoose';
import { IUserAuth, UserType } from './type';

export const UserAuthSchema = new Schema<IUserAuth>(
  {
    email: { type: String, required: true, index: true, unique: true },
    hash: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: Object.keys(UserType),
      default: UserType.USER,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const UserAuth = model('UserAuth', UserAuthSchema);
export * from './type';
export default UserAuth;
