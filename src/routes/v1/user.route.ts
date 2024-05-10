import UserController from '@controllers/user.controller';
import { UserAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { Container, Service } from 'typedi';

@Service()
class UserRouter {
  private userController = Container.get(UserController);

  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .get('/', UserAuth, this.userController.getUserById)
      .put('/', UserAuth, this.userController.updateUser)
      // .patch('/:id/password', UserAuth, this.userController.updatePassword)
      //   .post('/review', UserAuth, this.userController.createReview)
      .delete('/', UserAuth, this.userController.deleteUser);
  }
}

export default new UserRouter();
