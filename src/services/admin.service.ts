import { Exception } from '@middlewares/error.middleware';
import Admin from '@models/admin.model';
import UserAuth, { IUserAuth } from '@models/userauth.model';
import { Service } from 'typedi';
import RideService from './ride.service';
import Ride from '@models/ride.model';
import { Types } from 'mongoose';

@Service()
export default class AdminService {
  constructor(private rideService: RideService) {}

  async suspendUser(id: string): Promise<IUserAuth> {
    const user = await UserAuth.findOne({ userId: id });
    if (!user) throw new Exception(404, 'user not found');
    await user.updateOne(
      {
        isActive: !user.isActive,
      },
      { upsert: true },
    );
    return user;
  }

  async getUsers({
    page,
    size,
    role,
  }: {
    page: number;
    size: number;
    role: string;
  }): Promise<{
    users: Array<{}>;
    totalDocuments: number;
    pageable: { page: number; size: number };
  }> {
    let query: any = {};
    if (role) {
      query.role = role;
    }
    const pageSize = Number(size) || 10;
    const pageNumber = Number(page) || 1;
    const skip = pageSize * pageNumber - pageSize;
    const [users, totalDocuments] = await Promise.all([
      await UserAuth.find(query)
        .populate({
          path: 'userId',
          select: [
            'firstname',
            'lastname',
            'walletInfo',
            'totalPayments',
            'totalRides',
          ],
        })
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt: -1 }),
      await UserAuth.find(query).countDocuments(),
    ]);
    return {
      users: users,
      totalDocuments: totalDocuments,
      pageable: {
        page: pageNumber,
        size: pageSize,
      },
    };
  }

  async getRides({
    page,
    size,
    userId,
    riderId,
    paymentStatus,
    paymentType,
    status,
  }: {
    page: number;
    size: number;
    status: string;
    paymentStatus: string;
    paymentType: string;
    userId: string;
    riderId: string;
  }): Promise<{
    rides: Array<{}>;
    totalDocuments: number;
    pageable: { page: number; size: number };
  }> {
    let query: any = {};
    if (status) {
      query.status = status;
    }
    if (paymentType) {
      query.paymentType = paymentType;
    }
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }
    if (userId) {
      if (!Types.ObjectId.isValid(userId))
        throw new Exception(400, 'Invalid User ID');
      query.userId = userId;
    }
    if (riderId) {
      if (!Types.ObjectId.isValid(riderId))
        throw new Exception(400, 'Invalid rider ID');
      query.status = status;
    }
    // if (id) {
    //   if (!Types.ObjectId.isValid(id))
    //     throw new Exception(400, 'Invalid rider ID');
    //   query._id = id;
    // }
    const pageSize = Number(size) || 10;
    const pageNumber = Number(page) || 1;
    const skip = pageSize * pageNumber - pageSize;
    const [rides, totalDocuments] = await Promise.all([
      await Ride.find(query).skip(skip).limit(pageSize).sort({ createdAt: -1 }),
      await Ride.find(query).countDocuments(),
    ]);
    return {
      rides,
      totalDocuments,
      pageable: {
        page: pageNumber,
        size: pageSize,
      },
    };
  }

  async deleteProfile(id: string): Promise<boolean> {
    let admin = await Admin.findById(id);
    if (!admin) throw new Exception(400, 'admin not found');
    await Admin.findOneAndDelete({ email: admin.email });
    return true;
  }
}
