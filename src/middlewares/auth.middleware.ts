import { config } from '@config';
import User from '@models/user.model';
import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { Exception } from './error.middleware';
import crypto from 'crypto';
import Admin from '@models/admin.model';

export const UserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token: any = req.headers['x-auth-token'] || '';
    if (token) {
      let decoded: any = jwt.verify(token, config.jwt.user);
      let user = await User.findById(decoded.id, { _id: 1, role: 1 });
      if (user?._id == decoded.id) {
        next();
      } else {
        throw new Exception(401, 'Authentication Failed/Invalid Token');
      }
    } else {
      throw new Exception(401, 'Authentication Failed/Invalid Token');
    }
  } catch (e: any) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Authentication Failed',
    });
  }
};

// export const PaymentAuth = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const providerSignature = req.headers['x-paystack-signature'] || '';
//     const signature = crypto
//       .createHmac('sha512', config.payment.secretKey)
//       .update(JSON.stringify(req.body))
//       .digest('hex');
//     if (providerSignature != signature)
//       throw new Exception(401, 'Authentication failed');
//     next();
//   } catch (e: any) {
//     return res.status(401).json({
//       statusCode: 401,
//       message: e.message,
//     });
//   }
// };

export const AdminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers['x-auth-token'] as string;
    if (!token) {
      throw new Error('Authentication failed: No token provided');
    }
    if (token) {
      let decoded: any = jwt.verify(token, config.jwt.admin);
      let user = await Admin.findById(decoded.id, { _id: 1 });
      if (!user) {
        throw new Error('Authentication Failed/Invalid Token');
      }
      if (user?._id == decoded.id) {
        next();
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      return res.status(401).json({
        statusCode: 401,
        message: e.message,
      });
    }
  }
};
