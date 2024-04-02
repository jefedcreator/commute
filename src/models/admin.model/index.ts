import { Schema, model } from 'mongoose';
import { IAdmin } from './type';

const AdminSchema = new Schema<IAdmin>(
  {
    firstname: { type: String, default: '', required: true },
    lastname: { type: String, default: '', required: true },
    email: { type: String, default: '', index: true },
    hash: { type: String, default: '', required: true },
  },
  {
    timestamps: true,
  },
);

const Admin = model<IAdmin>('Admin', AdminSchema);
export * from './type';
export default Admin;
