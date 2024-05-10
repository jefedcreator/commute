import UserService from '@services/user.service';
import { AuthenticatedRequest } from '@types';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export default class UserController {
  constructor(private userService: UserService) {}

  getUserById = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let user = await this.userService.findOne(id);
      return CustomApiResponse(res, 200, 'user fetched', user);
    } catch (e) {
      next(e);
    }
  };

  updateUser = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let user = await this.userService.updateOne(id, req.body);
      return CustomApiResponse(res, 200, 'user updated', user);
    } catch (e) {
      next(e);
    }
  };

  updatePassword = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId as string;
      let user = await this.userService.updatePassword(id, req.body);
      return CustomApiResponse(res, 200, 'user updated', user);
    } catch (e) {
      next(e);
    }
  };

  deleteUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.userId as string;
      let user = await this.userService.deleteProfile(id);
      return CustomApiResponse(res, 200, 'user deleted', user);
    } catch (e) {
      next(e);
    }
  };
}
