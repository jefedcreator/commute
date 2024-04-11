import { UserType } from '@models/user.model';
import AuthService from '@services/auth.service';
import { CustomApiResponse } from '@utils/functions/apiresponse';
import { NextFunction, Response, Request } from 'express';

export default class AuthController {
  private authService = new AuthService();

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.createUser(UserType.user, req.body);
      return CustomApiResponse(res, 201, 'user created', user);
    } catch (e) {
      next(e);
    }
  };

  createRider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.createUser(UserType.rider, req.body);
      return CustomApiResponse(res, 201, 'rider created', user);
    } catch (e) {
      next(e);
    }
  };

  createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = await this.authService.createAdmin(req.body);
      return CustomApiResponse(res, 201, 'admin created', admin);
    } catch (e) {
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.login(req.body);
      return CustomApiResponse(res, 201, 'logged in', user);
    } catch (e) {
      next(e);
    }
  };

  loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = await this.authService.loginAdmin(req.body);
      return CustomApiResponse(res, 201, 'logged in', admin);
    } catch (e) {
      next(e);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resetPassword = await this.authService.resetPassword(req.body);
      return CustomApiResponse(res, 200, 'Reset successful', resetPassword);
    } catch (e) {
      next(e);
    }
  };
}
