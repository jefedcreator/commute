import AdminController from '@controllers/admin.controller';
import { Router } from 'express';
import { AdminAuth } from '@middlewares/auth.middleware';

class AdminRouter {
  private adminController = new AdminController();
  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .post('/riders', AdminAuth, this.adminController.getRiders)
      .post('/users', AdminAuth, this.adminController.getUsers)
      .patch('/users/suspend', AdminAuth, this.adminController.suspendUser)
      .delete('/:id', this.adminController.deleteAdmin);
  }
}
export default new AdminRouter();
