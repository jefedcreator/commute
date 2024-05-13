import { PRICE } from '@config';
import { Exception } from '@middlewares/error.middleware';
import Ride, { IRide, PaymentStatus, Status } from '@models/ride.model';
import Rider from '@models/rider.model';
import Transaction, {
  ITransaction,
  TransactionStatus,
  TransactionType,
} from '@models/transaction.model';
import User from '@models/user.model';
import duration from '@utils/functions/duration';
import PaymentService from '@utils/payment/payment.service';
import { createRideValidator } from '@validators/ride.validator';
import { Types } from 'mongoose';
import { Service } from 'typedi';
@Service()
export default class RideService {
  constructor(private paymentService: PaymentService) {}
  findRide = async (id: string): Promise<IRide> => {
    if (!Types.ObjectId.isValid(id))
      throw new Exception(400, 'Invalid ride ID');
    let ride = await Ride.findById(id)
      .populate({
        path: 'userId',
        select: ['email', 'firstname', 'lastname'],
      })
      .populate({
        path: 'riderId',
        select: ['email', 'firstname', 'lastname'],
      });
    if (!ride) throw new Exception(400, 'Ride not found');
    return ride;
  };

  findAllRides = async (): Promise<IRide[]> => {
    let rides = await Ride.find({});
    return rides;
  };

  findUserRides = async (userId: string): Promise<IRide[]> => {
    const rides = await Ride.find({
      $or: [{ riderId: userId }, { userId: userId }],
    }).sort({
      createdAt: -1,
    });
    return rides;
  };

  completeRide = async (rideId: string, riderId: string): Promise<boolean> => {
    const ride = await this.findRide(rideId);
    if (ride.riderId._id.toString() !== riderId) {
      throw new Exception(400, 'Invalid Rider');
    }
    if (ride.status != Status.ongoing)
      throw new Exception(400, 'Ride is not in progress');
    const startTime = ride.createdAt as unknown as Date | null;
    if (!startTime) {
      throw new Exception(400, 'Invalid ride start time');
    }
    const rideDuration = duration(startTime);
    const durationCost = PRICE * rideDuration;
    const reference = new Types.ObjectId().toString();
    const payment = await this.paymentService.createCharge({
      email: ride?.userId.email,
      amount: durationCost,
      bookingId: ride._id,
      riderId: ride.riderId._id,
      userId: ride.userId._id,
      rideId: ride._id,
      reference,
    });
    await Transaction.create({
      type: TransactionType.payment,
      amount: durationCost,
      userId: ride.userId,
      riderId: ride.riderId,
      reference,
      firstname: ride.userId.firstname,
      lastname: ride.userId.lastname,
      email: ride.userId.email,
      rideId: ride._id,
    });

    console.log('payment', payment);

    return true;
  };

  cancelRide = async (rideId: string, userId: string): Promise<boolean> => {
    const ride = await this.findRide(rideId);
    if (
      ride.riderId._id.toString() !== userId &&
      ride.userId._id.toString() !== userId
    )
      throw new Exception(400, 'approval failed');

    switch (ride.status) {
      case Status.completed:
        throw new Exception(400, 'Ride has been completed');
      case Status.ongoing:
        throw new Exception(400, 'Ride is in progress');
      case Status.cancelled:
        throw new Exception(400, 'Ride already cancelled');
      default:
        break;
    }
    await ride.updateOne({ status: Status.cancelled });
    return true;
  };

  approveRide = async (rideId: string, riderId: string): Promise<boolean> => {
    const ride = await this.findRide(rideId);
    if (ride.riderId._id.toString() !== riderId)
      throw new Exception(400, 'approval failed');
    if (ride.status != Status.pending) throw new Exception(400, 'Invalid ride');
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

  verifyPayment = async (data: any): Promise<boolean> => {
    const { reference, id, metadata, authorization, amount, channel } =
      data.data;
    let rideTx = await Transaction.findOne({ reference: reference });
    if (!rideTx) throw new Exception(400, 'transaction not found');
    if (rideTx.status == TransactionStatus.success)
      throw new Exception(400, 'Transaction has already been confirmed');
    let tx = await this.paymentService.queryTransaction(id);
    if (tx.status == 'failed') return false;
    await Promise.all([
      rideTx.updateOne({
        status: TransactionStatus.success,
        paymentId: id,
        paymentChannel: authorization.channel.toUpperCase(),
      }),
      Ride.findByIdAndUpdate(metadata.rideId, {
        transactionReference: rideTx._id,
        paymentStatus: PaymentStatus.completed,
        status: TransactionStatus.success,
        cost: amount,
        duration: amount / (PRICE * 100),
        paymentType: channel,
      }),
      User.findByIdAndUpdate(metadata.riderId, { $inc: { totalRides: 1 } }),
      User.findByIdAndUpdate(metadata.userId, {
        $inc: { totalRides: 1, totalPayments: amount / 100 },
      }),
    ]);

    return true;
  };
}
