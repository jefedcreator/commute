import { IUser } from '@models/user.model';

export interface IVehicle {
  vehicleName: string;
  vehicleId: string;
}
export interface IRider extends IUser {
  vehicle: IVehicle;
  rating: number;
}
