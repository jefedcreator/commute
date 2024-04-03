import User, { UserType } from '@models/user.model';
import { Schema } from 'mongoose';
import { IRider } from './type';

const RiderShema = new Schema<IRider>({
  vehicle: {
    vehicleName: {
      type: String,
      required: true,
      unique: true,
      default: '',
    },
    vehicleId: {
      type: String,
      required: true,
      unique: true,
      default: '',
    },
  },
  rating: { type: Number, require: true, default: 0 },
});

const Rider = User.discriminator(UserType.rider, RiderShema);
export * from './type';
export default Rider;
