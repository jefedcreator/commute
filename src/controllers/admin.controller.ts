import AdminService from '@services/admin.service';
import { NextFunction, Request, Response } from 'express';
import { CustomApiResponse } from '@utils/functions/apiresponse';
export default class AdminController {
  private adminService = new AdminService();
  suspendUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.adminService.suspendUser(req.body.userId);
      return CustomApiResponse(res, 201, 'user suspended', '');
    } catch (e) {
      next(e);
    }
  };
  getRiders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let filter = {
        status: req.query.status as string,
        page: Number(req.query.page),
        size: Number(req.query.size),
      };
      let bookings = await this.adminService.getRiders(filter);
      return CustomApiResponse(res, 200, 'fetch riders', bookings);
    } catch (e) {
      next(e);
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let filter = {
        page: Number(req.query.page),
        size: Number(req.query.size),
      };
      let users = await this.adminService.getUsers(filter);
      return CustomApiResponse(res, 200, 'fetch users', users);
    } catch (e) {
      next(e);
    }
  };

  //   getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       let filter = {
  //         status: req.query.status as string,
  //         type: req.query.type as string,
  //         page: Number(req.query.page),
  //         size: Number(req.query.size),
  //       };
  //       let transactions = await this.adminService.(filter);
  //       return CustomApiResponse(res, 200, 'fetch transactions', transactions);
  //     } catch (e) {
  //       next(e);
  //     }
  //   };
}
