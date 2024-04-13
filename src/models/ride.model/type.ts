import { Types, Document } from 'mongoose';

export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  cancelled = 'cancelled',
}

export enum Status {
  pending = 'pending',
  transit = 'transit',
  waiting = 'waiting',
  arrived = 'arrived',
  completed = 'completed',
  ongoing = 'ongoing',
}

export enum PaymentType {
  wallet = 'wallet',
  creditCard = 'credit-card',
  cash = 'cash',
}

export interface IRide extends Document {
  campusName: string;
  paymentStatus: PaymentStatus;
  paymentType: PaymentType;
  status: Status;
  paymentReferenceId: Types.ObjectId;
  distance: number;
  duration: number;
  cost: number;
  userId: Types.ObjectId;
  riderId: Types.ObjectId;
  pickupPoint: {
    pickupName: string;
    pickupLat: string;
    pickupLng: string;
  };
  destinationPoint: {
    destinationName: string;
    destinationLat: string;
    destinationLng: string;
  };
}
