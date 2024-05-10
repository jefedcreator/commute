import { Exception } from '@middlewares/error.middleware';
import User, { IUser, UserType } from '@models/user.model';
import Rider, { IRider } from '@models/rider.model';
import UserAuth from '@models/userauth.model';
import Admin from '@models/admin.model';
import { Service } from 'typedi';

@Service()
export default class AdminService {  async suspendUser(id: string): Promise<void> {
    const u = await User.findById(id);
    const user = await UserAuth.findOne({ email: u?.email });
    if (!user) throw new Exception(404, 'user not found');
    await user.updateOne({
      isActive: !user.isActive,
    });
  }

  async getUsers(d: { page: number; size: number }): Promise<{
    users: Array<IUser>;
    totalDocuments: number;
    pageable: { page: number; size: number };
  }> {
    const pageSize = Number(d.size) || 0; //total documents to be fetched
    const pageNumber = Number(d.page) || 0;
    const skip = pageSize * pageNumber - pageSize;
    const [users, totalDocuments] = await Promise.all([
      await User.find({ role: UserType.user })
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt: -1 }),
      await User.find({}).countDocuments(),
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

  async getRiders(d: { page: number; size: number }): Promise<{
    riders: Array<IRider>;
    totalDocuments: number;
    pageable: { page: number; size: number };
  }> {
    const pageSize = Number(d.size) || 0; //total documents to be fetched
    const pageNumber = Number(d.page) || 0;
    const skip = pageSize * pageNumber - pageSize;
    const [professionals, totalDocuments] = await Promise.all([
      await Rider.find({}).skip(skip).limit(pageSize).sort({ createdAt: -1 }),
      await Rider.find({}).countDocuments(),
    ]);
    return {
      riders: professionals,
      totalDocuments: totalDocuments,
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
