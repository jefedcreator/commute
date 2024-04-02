import { Schema, model } from 'mongoose';
import {
  ITransaction,
  PaymentProviderType,
  TransactionStatus,
  TransactionType,
} from './type';

const TransactionSchema = new Schema<ITransaction>(
  {
    type: { type: String, enum: Object.keys(TransactionType) },
    amount: { type: Number, require: true },
    status: {
      type: String,
      enum: Object.keys(TransactionStatus),
      default: TransactionStatus.pending,
    },
    firstname: { type: String, default: '', maxlength: 80 },
    lastname: { type: String, default: '', maxlength: 80 },
    email: { type: String, required: true, default: '' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    riderId: {
      type: Schema.Types.ObjectId,
      ref: 'Professional',
      index: true,
    },
    reference: { type: String, default: '', index: true },
    paymentChannel: { type: String, default: '' },
    paymentProvider: {
      type: String,
      enum: Object.keys(PaymentProviderType),
      default: PaymentProviderType.PAYSTACK,
    },
    paymentId: { type: Number, default: 0 },
    rideId: { type: Schema.Types.ObjectId, ref: 'Booking' },
  },
  {
    timestamps: true,
  },
);

const Transaction = model('Transaction', TransactionSchema);
export * from './type';
export default Transaction;
