import UserService from '@services/user.service';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Request, Response } from 'express';
export default class UserController {
  private userService = new UserService();

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await this.userService.findOne(req.params.id);
      return CustomApiResponse(res, 200, 'user fetched', user);
    } catch (e) {
      next(e);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await this.userService.updateOne(
        req.body.bookingId,
        req.body,
      );
      return CustomApiResponse(res, 200, 'user updated', user);
    } catch (e) {
      next(e);
    }
  };

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await this.userService.updatePassword(req.body);
      return CustomApiResponse(res, 200, 'user updated', user);
    } catch (e) {
      next(e);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await this.userService.deleteProfile(req.params.id);
      return CustomApiResponse(res, 200, 'user deleted', user);
    } catch (e) {
      next(e);
    }
  };
}
