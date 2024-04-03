import { Exception } from '@middlewares/error.middleware';
import User, { IUser } from '@models/User.model';
import UserAuth from '@models/userauth.model';
import {
  UpdatePasswordValidator,
  UpdateUserValidator,
} from '@validators/user.validator';
import bcrypt from 'bcrypt';
export default class UserService {
  async findOne(id: string): Promise<IUser> {
    let user = await User.findById(id, '-hash');
    if (!user) throw new Exception(404, 'user not found');
    return user;
  }

  async updateOne(id: string, data: IUser): Promise<IUser> {
    const { error, value } = UpdateUserValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    let user = await User.findById(id);
    if (!user) throw new Exception(404, 'user not found');
    await user?.updateOne(value, { upsert: true });
    return await this.findOne(id);
  }

  async updatePassword(data: IUser): Promise<boolean> {
    const { error, value } = UpdatePasswordValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    let user = await UserAuth.findOne({ userId: value.id });
    if (value.password != value.confirmPassword)
      throw new Exception(400, 'Password incorrect');
    let compare = await bcrypt.compare(
      value.oldPassword,
      user?.password as string,
    );
    if (!compare) throw new Exception(400, 'Password incorrect');
    const hashedPassword = await bcrypt.hash(value.password, 10);
    await user?.updateOne({
      hash: hashedPassword,
    });
    return true;
  }

  async deleteProfile(id: string): Promise<boolean> {
    let user = await User.findById(id);
    if (!user) throw new Exception(400, 'user not found');
    await UserAuth.findOneAndDelete({ email: user.email });
    await user.deleteOne();
    return true;
  }
}
