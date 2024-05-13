import RiderController from '@controllers/rider.controller';
import { UserAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { Container, Service } from 'typedi';

@Service()
class RiderRouter {
  private riderController = Container.get(RiderController);

  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .get('/', UserAuth, this.riderController.getRiderById)
      .patch('/', UserAuth, this.riderController.updateRider);
  }
}

export default new RiderRouter();
