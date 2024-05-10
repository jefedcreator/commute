import { IRide } from '@models/ride.model';
import Ride from '@models/ride.model';
import { Exception } from '@middlewares/error.middleware';
import { createRideValidator } from '@validators/ride.validator';
import User from '@models/user.model';
import Rider from '@models/rider.model';
import { Status } from '@models/ride.model';
import { Service } from 'typedi';
import PaymentService from '@utils/payment/payment.service';
import { Types } from 'mongoose';
@Service()
export default class RideService {
  constructor(private paymentService: PaymentService) {}
  findRide = async (id: string): Promise<IRide> => {
    let ride = await Ride.findById(id);
    if (!ride) throw new Exception(400, 'Ride not found');
    return ride.populate({
      path: 'userId',
      select: ['email', 'firstname', 'lastname'],
    });
  };
  findAllRides = async (): Promise<IRide[]> => {
    let rides = await Ride.find({});
    return rides;
  };
  completeRide = async (rideId: string, riderId: string): Promise<boolean> => {
    const ride = await this.findRide(rideId);
    if (ride.riderId.toString() !== riderId) {
      throw new Exception(400, 'Invalid Rider');
    }
    if (ride.status != Status.ongoing)
      throw new Exception(400, 'Ride is not in progress');
    await ride.updateOne({ status: 'completed' });
    await Rider.findByIdAndUpdate(ride.riderId, {
      $inc: {
        totalRides: +1,
      },
    });
    await User.findByIdAndUpdate(ride.userId, {
      $inc: {
        totalRides: +1,
      },
    });
    return true;
  };
  cancelRide = async (
    rideId: string,
    userId: string,
    riderId: string,
  ): Promise<boolean> => {
    const ride = await this.findRide(rideId);
    if (
      ride.riderId.toString() !== riderId ||
      ride.userId.toString() !== userId
    )
      throw new Exception(400, 'approval failed');
    switch (ride.status) {
      case Status.completed:
        throw new Exception(400, 'Ride has been completed');
      case Status.ongoing:
        throw new Exception(400, 'Ride is in progress');
      default:
        break;
    }
    await ride.updateOne({ status: Status.pending });
    return true;
  };
  
  approveRide = async (rideId: string, riderId: string): Promise<boolean> => {
    const ride = await this.findRide(rideId);
    if (ride.riderId.toString() !== riderId)
      throw new Exception(400, 'approval failed');
    if (ride.status != Status.pending) throw new Exception(400, 'Invalid ride');
    let payment = await this.paymentService.createCharge({
      email: ride?.user.email,
      amount: 100,
      bookingId: ride._id,
      riderId: ride.riderId,
      userId: ride.userId,
      rideId: ride._id,
      reference: new Types.ObjectId().toString(),
    });
    await ride.updateOne({ status: Status.ongoing });
    return true;
  };

  createRide = async (data: IRide): Promise<IRide> => {
    const { value, error } = createRideValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    let user = await User.findById(value.userId);
    if (!user) throw new Exception(404, 'user not found');
    let rider = await Rider.findById(value.riderId);
    if (!rider) throw new Exception(404, 'rider not found');
    let createRide = await Ride.create({
      ...value,
    });
    return createRide;
  };
}
