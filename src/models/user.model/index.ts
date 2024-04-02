import { Schema, model } from 'mongoose';
import { Gender, IUser, UserType } from './type';

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, default: '' },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    gender: { type: String, enum: Object.keys(Gender) },
    phone: { type: String, default: '' },
    avatar: { type: String, default: '' },
    dob: { type: String, default: '' },
    role: {
      type: String,
      enum: Object.keys(UserType),
      required: true,
      default: UserType.user,
    },
    walletInfo: {
      currency: { type: String },
      currentAmount: { type: Number, default: 0 },
    },
    totalPayments: { type: Number, default: 0 },
    totalRides: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const User = model<IUser>('User', UserSchema);
export * from './type';
export default User;
