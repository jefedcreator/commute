import AuthController from '@controllers/auth.controller';
import { Router } from 'express';
import { Service, Container } from 'typedi';

@Service()
class AuthRouter {
  private authController = Container.get(AuthController);
  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .post('/signup', this.authController.createUser)
      .post('/signin', this.authController.login)
      .post('/password/reset', this.authController.resetPassword)
  }
}
export default new AuthRouter();
