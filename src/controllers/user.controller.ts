import UserService from '@services/user.service';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Request, Response } from 'express';
export default class UserController {
  private userService = new UserService();

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let booking = await this.userService.findOne(req.params.id);
      return CustomApiResponse(res, 200, 'booking fetched', booking);
    } catch (e) {
      next(e);
    }
  };

  updateRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let booking = await this.userService.updateOne(
        req.body.bookingId,
        req.body,
      );
      return CustomApiResponse(res, 200, 'booking accepted', booking);
    } catch (e) {
      next(e);
    }
  };

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let booking = await this.userService.updatePassword(req.body);
      return CustomApiResponse(res, 200, 'booking accepted', booking);
    } catch (e) {
      next(e);
    }
  };
  
  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let booking = await this.userService.deleteProfile(req.params.id);
      return CustomApiResponse(res, 200, 'booking accepted', booking);
    } catch (e) {
      next(e);
    }
  };
}
