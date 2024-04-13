import { Exception } from '@middlewares/error.middleware';
import User, { IUser } from '@models/user.model';
import UserAuth, { IUserAuth } from '@models/userauth.model';
import {
  UpdatePasswordValidator,
  UpdateUserValidator,
} from '@validators/user.validator';
import bcrypt from 'bcrypt';
import { boolean } from 'joi';

export default class UserService {
  async findOne(id: string): Promise<IUserAuth> {
    let user = await UserAuth.findOne({ userId: id }).populate({
      path: 'userId',
      select: ['firstname', 'lastname'],
    });
    if (!user) throw new Exception(404, 'user not found');
    return user;
  }

  async updateOne(id: string, data: IUser): Promise<IUserAuth> {
    const { error, value } = UpdateUserValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    let user = await User.findById(id);
    if (!user) throw new Exception(404, 'user not found');
    await user?.updateOne(value, { upsert: true });
    return await this.findOne(id);
  }

  async updatePassword(id: string, data: IUser): Promise<boolean> {
    const { error, value } = UpdatePasswordValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    let user = await UserAuth.findOne({ userId: id });
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
