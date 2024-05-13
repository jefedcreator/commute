import AdminService from '@services/admin.service';
import { NextFunction, Request, Response } from 'express';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { Service } from 'typedi';

@Service()
export default class AdminController {
  constructor(private adminService: AdminService) {}

  suspendUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.adminService.suspendUser(req.params.id);
      let message = user.isActive ? 'user unsuspended' : 'user suspended';
      return CustomApiResponse(res, 200, message, user);
    } catch (e) {
      next(e);
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let filter = {
        page: Number(req.query.page),
        size: Number(req.query.size),
        role: req.query.role as string,
      };
      let users = await this.adminService.getUsers(filter);
      return CustomApiResponse(res, 200, 'fetch users', users);
    } catch (e) {
      next(e);
    }
  };

  getRides = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let filter = {
        page: Number(req.query.page),
        size: Number(req.query.size),
        status: req.query.status as string,
        paymentStatus: req.query.paymentStatus as string,
        paymentType: req.query.paymentType as string,
        userId: req.query.userId as string,
        riderId: req.query.riderId as string,
      };
      let users = await this.adminService.getRides(filter);
      return CustomApiResponse(res, 200, 'fetch rides', users);
    } catch (e) {
      next(e);
    }
  };

  deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let admin = await this.adminService.deleteProfile(req.params.id);
      return CustomApiResponse(res, 200, 'admin deleted', admin);
    } catch (e) {
      next(e);
    }
  };
}
