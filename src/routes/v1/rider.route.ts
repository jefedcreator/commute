import RiderController from '@controllers/rider.controller';
import { UserAuth } from '@middlewares/auth.middleware';
import { Router } from 'express';
class ProfessionaRouter {
  private riderController = new RiderController();

  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .get('/:id', UserAuth, this.riderController.getRiderById)
      .put('/:id', this.riderController.updateRider);
  }
}

export default new ProfessionaRouter();
