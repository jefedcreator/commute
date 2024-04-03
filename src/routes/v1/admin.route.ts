import AuthController from '@controllers/auth.controller';
import { Router } from 'express';
import AdminController from '@controllers/admin.controller';

class AdminRouter {
  private adminController = new AdminController();
  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .post('/riders', this.adminController.getRiders)
      .post('/users', this.adminController.getUsers)
      .patch('/users/suspend', this.adminController.suspendUser);
  }
}
export default new AdminRouter();
