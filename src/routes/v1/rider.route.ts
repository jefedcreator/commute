import RiderController from '@controllers/rider.controller';
import { UserAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { Container, Service } from 'typedi';

@Service()
class ProfessionaRouter {
  private riderController = Container.get(RiderController);

  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .get('/:id', UserAuth, this.riderController.getRiderById)
      .put('/:id', UserAuth, this.riderController.updateRider);
  }
}

export default new ProfessionaRouter();
