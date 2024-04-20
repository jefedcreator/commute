import UserController from '@controllers/user.controller';
import { UserAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';

class UserRouter {
  private userController = new UserController();
  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .get('/:id', UserAuth, this.userController.getUserById)
      .put('/:id', UserAuth, this.userController.updateUser)
      .patch('/:id/password', UserAuth, this.userController.updatePassword)
      //   .post('/review', UserAuth, this.userController.createReview)
      .delete('/:id', UserAuth, this.userController.deleteUser);
  }
}

export default new UserRouter();
