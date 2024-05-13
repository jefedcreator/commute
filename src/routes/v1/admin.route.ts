import AdminController from '@controllers/admin.controller';
import AuthController from '@controllers/auth.controller';
import { AdminAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { Container, Service } from 'typedi';

@Service()
class AdminRouter {
  private adminController = Container.get(AdminController);
  private authController = Container.get(AuthController);
  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .get('/riders', AdminAuth, this.adminController.getRiders)
      .get('/rides', AdminAuth, this.adminController.getRiders)
      .get('/users', AdminAuth, this.adminController.getUsers)
      .patch('/users/:id', AdminAuth, this.adminController.suspendUser)
      .delete('/', this.adminController.deleteAdmin)
      .post('/signin', this.authController.loginAdmin);
  }
}
export default new AdminRouter();
