import { Types, Document, SchemaTimestampsConfig } from 'mongoose';

export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  cancelled = 'cancelled',
}

export enum Status {
  pending = 'pending',
  completed = 'completed',
  ongoing = 'ongoing',
  cancelled = 'cancelled',
}

export enum PaymentType {
  wallet = 'wallet',
  creditCard = 'credit-card',
  cash = 'cash',
}

export interface IRide extends Document, SchemaTimestampsConfig {
  user: any;
  campusName: string;
  paymentStatus: PaymentStatus;
  paymentType: PaymentType;
  status: Status;
  paymentReferenceId: Types.ObjectId;
  distance: number;
  duration: number;
  cost: number;
  userId: {
    _id: Types.ObjectId;
    email: string;
    firstname: string;
    lastname: string;
  };
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
  completedAt: Date;
}
