import AuthController from '@controllers/auth.controller';
import { Router } from 'express';

class AuthRouter {
  private authController = new AuthController();
  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .post('/signup/user', this.authController.createUser)
      .post('/signup/rider', this.authController.createRider)
      .post('/login', this.authController.login)
      .post('/password-reset', this.authController.resetPassword)
      .post('/signup/admin', this.authController.createAdmin)
      .post('/admin/login', this.authController.loginAdmin);
  }
}
export default new AuthRouter();
