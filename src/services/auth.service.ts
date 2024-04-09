import { config } from '@config';
import { Exception } from '@middlewares/error.middleware';
import Admin, { IAdmin } from '@models/admin.model';
import User, { IUser, UserType } from '@models/user.model';
import UserAuth from '@models/userauth.model';
import Rider from '@models/rider.model';
import {
    AdminRegisterValidator,
    LoginValidator,
    ResetPasswordValidator,
    UserRegistrationValidator,
} from '@validators/auth.validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthService {
  async createUser(role: string, data: IUser): Promise<{ _id: string }> {
    let userId: string = '';
    const { error, value } = UserRegistrationValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    let user = await UserAuth.findOne({ email: value.email });
    if (user) throw new Exception(409, 'email already exists');
    let hashedPassword = await this.hashPassword(value.password);
    if (role == UserType.user) {
      await User.create({
        ...value,
        role: role,
      });
    }
    if (role == UserType.rider) {
      await Rider.create({
        ...value,
        role: role,
      });
    }
    await UserAuth.create({
      email: value.email,
      hash: hashedPassword,
      role: role,
      userId: userId,
    });
    return { _id: userId };
  }

  async createAdmin(data: IAdmin): Promise<{
    firstname: string;
    _id: string;
    email: string;
    lastname: string;
  }> {
    const { error, value } = AdminRegisterValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    const admin = await Admin.findOne({ email: value.email });
    if (admin) throw new Exception(409, 'admin already exists');
    let hashedPassword = await this.hashPassword(value.password);
    let createAdmin = await Admin.create({
      ...value,
      hash: hashedPassword,
    });
    return {
      _id: createAdmin._id.toString(),
      email: createAdmin.email,
      firstname: createAdmin.firstname,
      lastname: createAdmin.lastname,
    };
  }

  async loginAdmin(data: { email: string; password: string }) {
    const { error, value } = LoginValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    const admin = await Admin.findOne({ email: value.email });
    if (!admin) throw new Exception(400, 'Incorrect email or password');
    let compare = await bcrypt.compare(value.password, admin.hash);
    if (!compare) throw new Exception(400, 'Incorrect email or password');
    let token = jwt.sign(
      {
        id: admin._id,
      },
      config.jwt.admin,
      { expiresIn: '5 Days' },
    );
    return {
      token: token,
      _id: admin._id.toString(),
      email: admin.email,
      firstname: admin.firstname,
      lastname: admin.lastname,
    };
  }

  async login(data: { email: string; password: string }) {
    const { error, value } = LoginValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    let userAuth: any = await UserAuth.findOne({ email: value.email }).populate(
      {
        path: 'userId',
        select: ['firstname', 'lastname', 'email', 'isActive', 'role'],
      },
    );
    if (!userAuth.isActive)
      throw new Exception(400, 'Account susspended, Contact admin@dandys.app');
    if (!userAuth) throw new Exception(400, 'Incorrect email or password');
    let compare = await this.verifyPassword(value.password, userAuth.hash);
    if (!compare) throw new Exception(400, 'Incorrect email or password');

    let token = jwt.sign(
      {
        id: userAuth.userId._id.toString(),
        role: userAuth.role,
      },
      config.jwt.user,
      { expiresIn: '7 days' },
    );
    return {
      _id: userAuth.userId._id.toString(),
      email: userAuth.userId.email,
      firstname: userAuth.userId.firstname,
      lastname: userAuth.userId.lastname,
      isActive: userAuth.userId.isActive,
      role: userAuth.userId.role,
      token: token,
    };
  }

  async resetPassword(data: IUser): Promise<boolean> {
    const { error, value } = ResetPasswordValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    if (value.password != value.confirmPassword)
      throw new Exception(400, 'Passwords do not match');
    let hashedPassword = await this.hashPassword(value.password);
    await UserAuth.findOneAndUpdate(
      { email: value.email },
      {
        hash: hashedPassword,
      },
    );
    return true;
  }

  private async hashPassword(payload: string) {
    const hash = await bcrypt.hash(payload, 10);
    return hash;
  }
  private async verifyPassword(payload: string, hash: string) {
    return await bcrypt.compare(payload, hash);
  }
}
