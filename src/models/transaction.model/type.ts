import { Types } from 'mongoose';

export enum TransactionType {
  withdrawal = 'withdrawal',
  payment = 'payment',
}

export enum TransactionStatus {
  pending = 'pending',
  failed = 'failed',
  success = 'success',
}

export enum PaymentProviderType {
  PAYSTACK = 'PAYSTACK',
}

export interface ITransaction {
  type: TransactionType;
  firstname: string;
  lastname: string;
  email: string;
  amount: number;
  status: TransactionStatus;
  userId: Types.ObjectId;
  riderId?: Types.ObjectId;
  reference: string;
  paymentChannel: string;
  paymentProvider: PaymentProviderType;
  paymentId: number;
  rideId?: Types.ObjectId;
}
