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
      .post('/signup', this.authController.createAdmin)
      .post('/signin', this.authController.loginAdmin)
      .get('/rides', AdminAuth, this.adminController.getRides)
      .get('/users', AdminAuth, this.adminController.getUsers)
      .patch('/users/:id', AdminAuth, this.adminController.suspendUser)
      .delete('/users/:id', AdminAuth, this.adminController.deleteUser)
      .delete('/', AdminAuth, this.adminController.deleteAdmin);
  }
}
export default new AdminRouter();
