import { Schema, model } from 'mongoose';
import { IRide, PaymentStatus, Status, PaymentType } from './type';

const RideSchema = new Schema<IRide>(
  {
    campusName: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: Object.keys(PaymentStatus),
      default: PaymentStatus.pending,
    },
    paymentType: {
      type: String,
      enum: Object.keys(PaymentType),
      default: PaymentType.cash,
    },
    status: {
      type: String,
      enum: Object.keys(Status),
      default: Status.pending,
    },
    paymentReferenceId: { type: Schema.Types.ObjectId, ref: 'Payment' },
    distance: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    riderId: { type: Schema.Types.ObjectId, ref: 'Rider' },
    pickupPoint: {
      pickupName: { type: String, default: '' },
      pickupLat: { type: String, default: '' },
      pickupLng: { type: String, default: '' },
    },
    destinationPoint: {
      destinationName: { type: String, default: '' },
      destinationLat: { type: String, default: '' },
      destinationLng: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  },
);

const Ride = model<IRide>('Ride', RideSchema);
export * from './type';
export default Ride;
