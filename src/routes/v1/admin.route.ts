import AdminController from '@controllers/admin.controller';
import { AdminAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { Container, Service } from 'typedi';

@Service()
class AdminRouter {
  private adminController = Container.get(AdminController);
  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .get('/riders', AdminAuth, this.adminController.getRiders)
      .get('/rides', AdminAuth, this.adminController.getRiders)
      .get('/users', AdminAuth, this.adminController.getUsers)
      .patch('/users/suspend', AdminAuth, this.adminController.suspendUser)
      .delete('/:id', this.adminController.deleteAdmin);
  }
}
export default new AdminRouter();
